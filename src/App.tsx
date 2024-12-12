import UsernameInput from "./components/UsernameInput";
import RecordButton from "./components/RecordButton";
import { useState } from "react";
import AudioStream from "./components/AudioStream";
import TranscriptList from "./components/TranscriptList";
import WelcomeModal from "./components/WelcomeModal";
import { WebSocketProvider } from './contexts/WebSocketContext';
import { useWebSocket } from './contexts/WebSocketContext';

function App() {
  const [username, setUsername] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [topic, setTopic] = useState<string>("general");
  const { sendMessage, sendAudio, connectionStatus, reconnect } = useWebSocket();

  const handleRecordingComplete = async (audioBlob: Blob | null) => {
    setIsRecording(false);
    if (!audioBlob || !username) {
      return;
    }
    sendAudio(audioBlob, username);
  };

  const handleSendMessage = () => {
    if (!username || !message.trim()) return;
    
    try {
      sendMessage(message, topic, username);
      setMessage(""); // Clear message after sending
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {connectionStatus !== 'Connected' && (
        <div className="bg-yellow-100 p-2 text-center">
          Status: {connectionStatus}
          {connectionStatus === 'Failed to connect' && (
            <button 
              onClick={reconnect}
              className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
            >
              Retry Connection
            </button>
          )}
        </div>
      )}
      <WelcomeModal />
      <h1 className="text-3xl font-bold text-gray-800 mb-8 pt-8 flex justify-center">
        ConvinceMe
      </h1>
      <div className="flex flex-col items-center space-y-4">
        <div className="bg-white pb-4 rounded-lg shadow-md w-96">
          <TranscriptList />
          <AudioStream
            volume={isRecording ? 0.03 : 1.0}
          />
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          {username ? (
            <div className="space-y-4">
              <div className="flex justify-center">
                <RecordButton
                  onRecordingComplete={handleRecordingComplete}
                  onStartRecording={() => setIsRecording(true)}
                />
              </div>
              <div className="space-y-2">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Topic"
                  className="w-full px-3 py-2 border rounded-md"
                />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full px-3 py-2 border rounded-md"
                  rows={3}
                />
                <button
                  onClick={handleSendMessage}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Send Message
                </button>
              </div>
            </div>
          ) : (
            <UsernameInput onConfirmUsername={setUsername} />
          )}
        </div>
      </div>
    </div>
  );
}

export default function AppWithProvider() {
  return (
    <WebSocketProvider>
      <App />
    </WebSocketProvider>
  );
}
