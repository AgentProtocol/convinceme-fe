import { useState, useEffect } from 'react';
import AudioPlayer from './AudioPlayer';
import ScoreBar from './ScoreBar';
import ArgumentsList, { Argument } from './ArgumentsList';
import ArgumentInput from './ArgumentInput';
import { useWebSocket } from '../contexts/WebSocketContext';

interface GameUIProps {
  side1: string;
  side2: string;
}

// Demo data
const demoArguments: Argument[] = [
  {
    id: 1,
    text: "Bears have incredible strength and can lift boulders weighing hundreds of pounds. Their raw power is unmatched in the animal kingdom!",
    score: 75,
    side: "Bear",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    userAddress: "0x1234...5678"
  },
  {
    id: 2,
    text: "Tigers are the ultimate predators. With their stealth, speed, and agility, they can take down prey much larger than themselves.",
    score: 85,
    side: "Tiger",
    timestamp: new Date(Date.now() - 1000 * 60 * 4), // 4 minutes ago
    userAddress: "0x2345...6789"
  },
  {
    id: 3,
    text: "Bears have thick fur and layers of fat that make them nearly invulnerable. They can survive in the harshest conditions.",
    score: 65,
    side: "Bear",
    timestamp: new Date(Date.now() - 1000 * 60 * 3), // 3 minutes ago
    userAddress: "0x3456...7890"
  },
  {
    id: 4,
    text: "A tiger's bite force is among the strongest of all big cats. Their retractable claws and muscular build make them perfect killing machines.",
    score: 70,
    side: "Tiger",
    timestamp: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
    userAddress: "0x4567...8901"
  },
  {
    id: 5,
    text: "I've studied both animals, and while bears are strong, tigers are more agile and have better hunting techniques.",
    score: 45,
    side: "Tiger",
    timestamp: new Date(Date.now() - 1000 * 60 * 1), // 1 minute ago
    userAddress: "0x5678...9012"
  }
];

// Calculate initial scores based on arguments
const calculateInitialScores = (args: Argument[]) => {
  return args.reduce(
    (scores, arg) => {
      if (arg.side === "Bear") {
        scores.bear += arg.score;
      } else {
        scores.tiger += arg.score;
      }
      return scores;
    },
    { bear: 500, tiger: 500 }
  );
};

export default function GameUI({ side1, side2 }: GameUIProps) {
  const initialScores = calculateInitialScores(demoArguments);
  const [username, setUsername] = useState<string>("");
  const [side1Score, setSide1Score] = useState(initialScores.bear);
  const [side2Score, setSide2Score] = useState(initialScores.tiger);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [debateArguments, setDebateArguments] = useState<Argument[]>(demoArguments);
  const { sendMessage } = useWebSocket();

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSendArgument = (argument: string) => {
    if (!username || !argument.trim()) return;
    
    try {
      sendMessage(argument, "debate", username);
      
      // For demo: Add the argument locally with a random score
      const newArgument: Argument = {
        id: debateArguments.length + 1,
        text: argument,
        score: Math.floor(Math.random() * 50) + 30, // Random score between 30-80
        side: Math.random() > 0.5 ? side1 : side2, // Randomly assign to a side
        timestamp: new Date(),
        userAddress: "0x1234...5678" // In real app, this would come from wallet connection
      };
      
      setDebateArguments(prev => [...prev, newArgument]);
      
      // Update scores
      if (newArgument.side === side1) {
        setSide1Score(prev => prev + newArgument.score);
      } else {
        setSide2Score(prev => prev + newArgument.score);
      }
    } catch (error) {
      console.error('Failed to send argument:', error);
    }
  };

  const handleAudioPlaybackChange = (isPlaying: boolean, speakingSide: string) => {
    // We don't need to track the active speaker in GameUI anymore
    // The AudioPlayer component handles this internally
  };

  return (
    <div className="h-full max-w-5xl mx-auto px-4 flex flex-col">
      <ScoreBar
        side1={side1}
        side2={side2}
        side1Score={side1Score}
        side2Score={side2Score}
        timeLeft={timeLeft}
        className="shrink-0"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-4 min-h-0 pb-4">
        {/* Sides Display */}
        <div className="bg-white p-6 rounded-lg shadow-md shrink-0">
          <AudioPlayer 
            side1={side1}
            side2={side2}
            onPlaybackChange={handleAudioPlaybackChange}
          />
        </div>

        {/* Arguments Feed */}
        <div className="flex-1 bg-white rounded-lg shadow-md flex flex-col min-h-0">
          <div className="p-4 border-b shrink-0">
            <h2 className="text-xl font-bold">Debate Arguments</h2>
          </div>

          <div className="flex-1 min-h-0">
            <ArgumentsList arguments={debateArguments} side1={side1} />
          </div>

          <div className="p-4 bg-gray-50 border-t shrink-0">
            {!username ? (
              <div className="flex flex-col items-center py-2">
                <button
                  onClick={() => setUsername("demo-user")}
                  className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"></span>
                  <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                  <span className="relative flex items-center gap-2">
                    Login to Participate
                    <svg className="w-5 h-5 ml-2 transition-transform duration-200 ease-in-out group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </button>
                <p className="mt-3 text-sm text-gray-600">Connect your wallet to join the debate</p>
              </div>
            ) : (
              <ArgumentInput onSubmit={handleSendArgument} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 