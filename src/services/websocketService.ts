import { Transcript } from "../components/TranscriptList";
import { EventEmitter } from 'events';

type WebSocketCallbacks = {
  onTranscript?: (transcript: Transcript) => void;
  onAudioStream?: (audioBlob: Blob) => void;
  onStatusChange?: (status: string) => void;
  onError?: (error: Event) => void;
};

class WebSocketService extends EventEmitter {
  private socket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout = 1000; // Start with 1 second

  connect(callbacks: WebSocketCallbacks) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      console.log('Already connected');
      return;
    }

    try {
      this.socket = new WebSocket('ws://localhost:8080/ws/conversation');

      this.socket.onopen = () => {
        console.log('Connected to WebSocket');
        this.reconnectAttempts = 0;
        callbacks.onStatusChange?.('Connected');
      };

      this.socket.onmessage = async (event) => {
        console.log("Received message:", event.data);
        if (event.data instanceof Blob) {
          this.emit('audioStream', event.data);
        } else {
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'transcript') {
              this.emit('transcript', data.transcript);
            } else if (data.type === 'text') {
              //This is temporary
              this.emit('transcript', {
                id: Date.now(),
                transcript: data.message,
                username: data.agent,
                createdAt: new Date()
              });
            } else if (data.type === 'audio_end') {
              this.emit('audio_end');
            }
          } catch (error) {
            console.error('Error parsing message:', error);
          }
        }
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket Error:', error);
        callbacks.onError?.(error);
      };

      this.socket.onclose = () => {
        console.log('Connection closed');
        callbacks.onStatusChange?.('Disconnected');
        
        // Attempt to reconnect
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          this.reconnectAttempts++;
          console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
          setTimeout(() => {
            this.connect(callbacks);
          }, this.reconnectTimeout * this.reconnectAttempts);
        } else {
          console.log('Max reconnection attempts reached');
          callbacks.onStatusChange?.('Failed to connect');
        }
      };
    } catch (error) {
      console.error('Error creating WebSocket:', error);
      callbacks.onStatusChange?.('Connection failed');
    }
  }

  sendMessage(message: string, topic: string, username: string) {
    if (!this.socket) {
      console.log('Not connected');
      return;
    }

    const data = {
      type: 'message',
      topic: topic,
      message: message,
      username: username
    };

    try {
      this.socket.send(JSON.stringify(data));
      console.log('Message sent:', message);
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  sendAudio(audioBlob: Blob, username: string) {
    if (!this.socket) {
      console.log('Not connected');
      return;
    }

    const data = {
      type: 'audio',
      username: username,
      data: audioBlob
    };

    try {
      this.socket.send(JSON.stringify(data));
    } catch (error) {
      console.error('Error sending audio:', error);
    }
  }

  disconnect() {
    this.socket?.close();
    this.socket = null;
  }

  // Add this method for manual reconnection
  reconnect(callbacks: WebSocketCallbacks) {
    this.reconnectAttempts = 0;
    this.disconnect();
    this.connect(callbacks);
  }
}

export default new WebSocketService(); 