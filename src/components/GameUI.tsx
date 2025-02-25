import { useState, useEffect } from 'react';
import AudioPlayer from './AudioPlayer';
import ScoreBar from './ScoreBar';
import ArgumentsList, { Argument } from './ArgumentsList';
import ArgumentInput from './ArgumentInput';
import LoginButton from './LoginButton';
import { useWebSocket } from '../contexts/WebSocketContext';
import { useAccount } from "@starknet-react/core";
import websocketService from '../services/websocketService';

interface GameUIProps {
  side1: string;
  side2: string;
  topic: string;
}

interface ArgumentScore {
  strength: number;
  relevance: number;
  logic: number;
  truth: number;
  humor: number;
  average: number;
  Agent1_support: number;
  Agent2_support: number;
  explanation: string;
}

interface APIArgument {
  id: number;
  player_id: string;
  topic: string;
  content: string;
  created_at: string;
  score?: ArgumentScore;
  side: string;
}

export default function GameUI({ side1, side2, topic }: GameUIProps) {
  const { address } = useAccount();
  const [debateArguments, setDebateArguments] = useState<Argument[]>([]);
  const { sendMessage } = useWebSocket();

  const transformArgument = (arg: APIArgument): Argument => ({
    id: arg.id,
    text: arg.content,
    score: arg.score?.average ?? 0,
    side: arg.side,
    timestamp: new Date(arg.created_at),
    userAddress: arg.player_id
  });

  // Add WebSocket argument listener
  useEffect(() => {
    const handleNewArgument = (argument: APIArgument) => {
      const newArgument = transformArgument(argument);

      setDebateArguments(prev => {
        const existingIndex = prev.findIndex(
          arg => arg.text === newArgument.text && arg.userAddress === newArgument.userAddress
        );

        if (existingIndex !== -1) {
          // Update existing argument
          const updated = [...prev];
          updated[existingIndex] = newArgument;
          return updated;
        }

        // Add new argument
        return [...prev, newArgument];
      });
    };

    websocketService.on('argument', handleNewArgument);

    // Cleanup listener on unmount
    return () => {
      websocketService.off('argument', handleNewArgument);
    };
  }, [side1, side2]);

  // Add useEffect to fetch arguments
  useEffect(() => {
    const fetchArguments = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + '/api/arguments');
        const data = await response.json();
        if (data.arguments) {
          // Transform API data to match our Argument interface
          const transformedArguments = data.arguments.reverse().map(transformArgument);

          setDebateArguments(transformedArguments);
        } else {
          console.error('No arguments found');
        }
      } catch (error) {
        console.error('Failed to fetch arguments:', error);
      }
    };

    fetchArguments();
  }, []);

  const handleSendArgument = (argument: string, side: string) => {
    if (!address || !argument.trim()) return;

    try {
      sendMessage(argument, topic, address, side);

      // For demo: Add the argument locally with a random score
      const newArgument: Argument = {
        id: Math.floor(Math.random() * 1000000) * 10000,
        text: argument,
        score: null,
        side: side,
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
        side1={side1}
        side2={side2}
        className="shrink-0"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-3 min-h-0">
        {/* Sides Display */}
        <div className="bg-surface-light rounded-xl shadow-soft p-3">
          <AudioPlayer
            side1={side1}
            side2={side2}
          />
        </div>

        {/* Arguments Feed */}
        <div className="flex-1 bg-surface-light rounded-xl shadow-soft flex flex-col min-h-0">
          <div className="flex-1 min-h-0">
            <ArgumentsList arguments={debateArguments} side1={side1} />
          </div>

          <div className="p-3 bg-surface-dark border-t border-gray-100">
            {!address ? (
              <LoginButton />
            ) : (
              <ArgumentInput 
                onSubmit={handleSendArgument} 
                side1={side1}
                side2={side2}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 