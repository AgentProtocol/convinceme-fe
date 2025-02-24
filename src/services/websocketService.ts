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
  private heartbeatInterval: number | null = null;
  private pongReceived = false;

  private startHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }

    this.heartbeatInterval = setInterval(() => {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        console.log('Sending ping...');
        this.socket.send(JSON.stringify({ type: 'ping' }));
        
        // Store timeout ID so we can clear it
        setTimeout(() => {
          if (!this.pongReceived) {
            console.log('No pong received, attempting reconnect...');
            this.socket?.close();
          }
        }, 10000);
      }
    }, 45000);
  }

  private stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  connect(callbacks: WebSocketCallbacks) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      console.log('Already connected');
      return;
    }

    try {
      console.log('Attempting to connect to:', import.meta.env.VITE_WEBSOCKET_URL + '/ws/conversation');
      this.socket = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL + '/ws/conversation');

      this.socket.onopen = () => {
        console.log('Connected to WebSocket');
        this.reconnectAttempts = 0;
        callbacks.onStatusChange?.('Connected');
        this.startHeartbeat();
      };

      this.socket.onmessage = async (event) => {
        console.log("Received message:", event.data);
        try {
          const data = JSON.parse(event.data);

          switch (data.type) {
            case 'audio':
              // if (data.mode === 'audio') {
                this.emit('audioStream', {
                  audioPath: data.audioUrl,
                  agent: data.agent
                });
              // }
              break;
              
            case 'message':
              this.emit('transcript', {
                id: Date.now(),
                transcript: data.content,
                username: data.agent,
                createdAt: new Date()
              });
              break;
              
            case 'conviction':
              try {
                const conviction = JSON.parse(data.message);
                this.emit('conviction', conviction);
              } catch (error) {
                console.error('Error parsing conviction:', error);
              }
              break;

            case 'argument':
              this.emit('argument', data.argument);
              break;

            case 'game_score':
              this.emit('game_score', data.gameScore);
              break;
              
            case 'pong':
              this.pongReceived = true;
              break;
              
            default:
              console.warn('Unknown message type:', data.type);
          }
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket Error:', error);
        callbacks.onError?.(error);
      };

      this.socket.onclose = (event) => {
        console.log('Connection closed with code:', event.code, 'reason:', event.reason);
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

  sendMessage(message: string, topic: string, player_id: string, side: string) {
    if (!this.socket) {
      console.log('Not connected');
      return;
    }

    const data = {
      type: 'text',
      message,
      topic,
      mode: 'audio',
      player_id,
      side
    };

    try {
      this.socket.send(JSON.stringify(data));
      console.log('Message sent:', message);
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  sendAudio(audioBlob: Blob, player_id: string) {
    if (!this.socket) {
      console.log('Not connected');
      return;
    }

    const formData = new FormData();
    const audioFile = new File([audioBlob], 'recording.webm', { type: 'audio/webm' });
    formData.append('audio', audioFile);

    const data = {
      type: 'audio',
      topic: 'The Nature of Consciousness and Reality',
      mode: 'audio', // Request audio generation for voice input
      player_id
    };

    try {
      this.socket.send(JSON.stringify(data));
    } catch (error) {
      console.error('Error sending audio:', error);
    }
  }

  disconnect() {
    this.stopHeartbeat();
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