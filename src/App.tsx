import UsernameInput from './components/login/UsernameInput';
import RecordButton from './components/recording/RecordButton';
import { useState, useEffect, useRef } from 'react';
import AudioStream from './components/streaming/AudioStream';

interface Message {
  sender: 'Guest' | 'Interviewer' | 'Player A';
  text: string;
  timestamp: Date;
}

function App() {
  const [username, setUsername] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'Interviewer',
      text: 'Good morning and welcome to ConvinceMe! Today we have an exciting debate about artificial intelligence.',
      timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
    },
    {
      sender: 'Player A',
      text: "Thanks for having me! I'll be arguing in favor of AI development.",
      timestamp: new Date(Date.now() - 1000 * 60 * 9), // 9 minutes ago
    },
    {
      sender: 'Guest',
      text: "Happy to be here! I'll be presenting the cautionary perspective on AI.",
      timestamp: new Date(Date.now() - 1000 * 60 * 8), // 8 minutes ago
    },
    {
      sender: 'Interviewer',
      text: "Let's start with Player A. What's your opening statement?",
      timestamp: new Date(Date.now() - 1000 * 60 * 7), // 7 minutes ago
    },
    {
      sender: 'Player A',
      text: 'AI has shown tremendous potential in healthcare, scientific research, and improving daily life. We should embrace this technology.',
      timestamp: new Date(Date.now() - 1000 * 60 * 6), // 6 minutes ago
    },
    {
      sender: 'Guest',
      text: 'While I agree there are benefits, we must consider the risks to jobs and privacy.',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    },
    {
      sender: 'Interviewer',
      text: 'Interesting points from both sides. Guest, could you elaborate on the privacy concerns?',
      timestamp: new Date(Date.now() - 1000 * 60 * 4), // 4 minutes ago
    },
    {
      sender: 'Guest',
      text: "Of course. AI systems require massive amounts of personal data, and we've already seen instances of misuse.",
      timestamp: new Date(Date.now() - 1000 * 60 * 3), // 3 minutes ago
    },
    {
      sender: 'Player A',
      text: 'But we can implement strong regulations and encryption to protect privacy while still benefiting from AI.',
      timestamp: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
    },
    {
      sender: 'Interviewer',
      text: 'The floor is now open for our guest to respond.',
      timestamp: new Date(Date.now() - 1000 * 60), // 1 minute ago
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleRecordingComplete = async (audioBlob: Blob | null) => {
    setIsRecording(false);
    if (!audioBlob) {
      return;
    }

    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('username', username);

    // const audioUrl = URL.createObjectURL(audioBlob);
    // const audio = new Audio(audioUrl);
    // audio.play();
    try {
      //TODO: upload to server
      // const response = await fetch("/api/upload", {
      //   method: "POST",
      //   body: formData,
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to upload audio");
      // }

      console.log('Audio uploaded successfully');
    } catch (error) {
      console.error('Error uploading audio:', error);
      alert('Failed to upload audio');
    }
  };

  const startRecording = () => {
    setIsRecording(true);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 pt-8 flex justify-center">
        ConvinceMe
      </h1>
      <div className="flex flex-col items-center space-y-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <AudioStream
            streamUrl="https://audio-edge-5bkfj.fra.h.radiomast.io/ref-128k-mp3-stereo"
            volume={isRecording ? 0.03 : 1.0}
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md w-96">
          <div
            className="h-96 overflow-y-auto"
            style={{
              scrollBehavior: 'smooth',
            }}
          >
            <div>
              {messages.map((message, index) => (
                <div key={index} className="mb-2">
                  <span
                    className={`font-bold ${
                      message.sender === 'Guest'
                        ? 'text-blue-600'
                        : message.sender === 'Interviewer'
                          ? 'text-green-600'
                          : 'text-purple-600'
                    }`}
                  >
                    {message.sender}:
                  </span>
                  <span className="ml-2">{message.text}</span>
                  <span className="text-xs text-gray-500 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          {username ? (
            <div className="flex justify-center">
              <RecordButton
                onRecordingComplete={handleRecordingComplete}
                onStartRecording={startRecording}
              />
            </div>
          ) : (
            <UsernameInput onConfirmUsername={setUsername} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
