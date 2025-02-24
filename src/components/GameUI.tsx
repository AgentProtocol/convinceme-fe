import { useState } from 'react';
import AudioPlayer from './AudioPlayer';
import ScoreBar from './ScoreBar';
import ArgumentsList, { Argument } from './ArgumentsList';
import ArgumentInput from './ArgumentInput';
import LoginButton from './LoginButton';
import { useWebSocket } from '../contexts/WebSocketContext';
import { useAccount } from "@starknet-react/core";
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

// // Calculate initial scores based on arguments
// const calculateInitialScores = (args: Argument[], side1: string) => {
//   return args.reduce(
//     (scores, arg) => {
//       if (arg.side === side1) {
//         scores.side1 += arg.score;
//       } else {
//         scores.side2 += arg.score;
//       }
//       return scores;
//     },
//     { side1: 500, side2: 500 }
//   );
// };

export default function GameUI({ side1, side2 }: GameUIProps) {
  const { address } = useAccount();
  // const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [debateArguments, setDebateArguments] = useState<Argument[]>(demoArguments);
  const { sendMessage } = useWebSocket();

  // Timer countdown
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTimeLeft((prev) => Math.max(0, prev - 1));
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, []);

  const handleSendArgument = (argument: string) => {
    if (!address || !argument.trim()) return;
    
    try {
      sendMessage(argument, "debate", address);
      
      // For demo: Add the argument locally with a random score
      const newArgument: Argument = {
        id: debateArguments.length + 1,
        text: argument,
        score: Math.floor(Math.random() * 50) + 30, // Random score between 30-80
        side: Math.random() > 0.5 ? side1 : side2, // Randomly assign to a side
        timestamp: new Date(),
        userAddress: address
      };
      
      setDebateArguments(prev => [...prev, newArgument]);
    } catch (error) {
      console.error('Failed to send argument:', error);
    }
  };

  return (
    <div className="h-full max-w-5xl mx-auto flex flex-col">
      <ScoreBar
        className="shrink-0"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-6 min-h-0">
        {/* Sides Display */}
        <div className="bg-surface-light rounded-xl shadow-soft p-6">
          <AudioPlayer 
            side1={side1}
            side2={side2}
          />
        </div>

        {/* Arguments Feed */}
        <div className="flex-1 bg-surface-light rounded-xl shadow-soft flex flex-col min-h-0">
          <div className="flex-1 min-h-0 pt-6">
            <ArgumentsList arguments={debateArguments} side1={side1} />
          </div>

          <div className="p-6 bg-surface-dark border-t border-gray-100">
            {!address ? (
              <LoginButton />
            ) : (
              <ArgumentInput onSubmit={handleSendArgument} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 