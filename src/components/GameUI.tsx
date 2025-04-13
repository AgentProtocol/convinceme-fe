import { useState, useEffect, useRef } from 'react';
import AudioPlayer from './AudioPlayer';
import ScoreBar from './ScoreBar';
import ArgumentsList from './ArgumentsList';
import ArgumentInput from './ArgumentInput';
import LoginButton from './LoginButton';
import { useWebSocket } from '../contexts/WebSocketContext';
import { useAccount } from "@starknet-react/core";
import websocketService from '../services/websocketService';
import InactivityModal from './InactivityModal';
import { IS_GAME_DISABLED } from '../constants';
import { Argument, ArgumentScore } from '../types';

interface GameUIProps {
  side1: string;
  side2: string;
  topic: string;
  debateId: string;
}

export default function GameUI({ side1, side2, topic, debateId }: GameUIProps) {
  const { address } = useAccount();
  const [debateArguments, setDebateArguments] = useState<Argument[]>([]);
  const { sendMessage, pauseConnection, reconnect } = useWebSocket();
  const [isInactive, setIsInactive] = useState(false);
  const inactivityTimerRef = useRef<number | null>(null);

  const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds

  const resetInactivityTimer = () => {
    if (IS_GAME_DISABLED) return;
    // Clear existing timer
    if (inactivityTimerRef.current) {
      window.clearTimeout(inactivityTimerRef.current);
    }

    // Set new timer
    inactivityTimerRef.current = window.setTimeout(() => {
      setIsInactive(true);
      pauseConnection();
    }, INACTIVITY_TIMEOUT);
  };

  const handleResumeGame = () => {
    setIsInactive(false);
    reconnect();
    resetInactivityTimer();
  };

  // Initialize inactivity timer on component mount
  useEffect(() => {
    resetInactivityTimer();

    // Clean up timer on unmount
    return () => {
      if (inactivityTimerRef.current) {
        window.clearTimeout(inactivityTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleNewArgument = (argument: Argument) => {
      // Reset inactivity timer when a new argument is received
      resetInactivityTimer();

      setDebateArguments(prev => {
        const existingIndex = prev.findIndex(
          arg => arg.content === argument.content && arg.player_id === argument.player_id
        );

        if (existingIndex !== -1) {
          // Update existing argument
          const updated = [...prev];
          updated[existingIndex] = argument;
          return updated;
        }

        // Add new argument
        return [...prev, argument];
      });
    };

    websocketService.on('argument', handleNewArgument);

    // Cleanup listener on unmount
    return () => {
      websocketService.off('argument', handleNewArgument);
    };
  }, [side1, side2]);

  useEffect(() => {
    const fetchArguments = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/debates/${debateId}/arguments`);
        console.log('response', response);
        const data = await response.json();
        console.log('data', data);
        if (data.items) {
          // Transform API data to match our Argument interface
          const orderedArguments = data.items.reverse();
          setDebateArguments(orderedArguments);
        } else {
          console.error('No arguments found');
        }
      } catch (error) {
        console.error('Failed to fetch arguments:', error);
      }
    };

    fetchArguments();
  }, [debateId]);

  const handleSendArgument = (argument: string, side: string) => {
    if (!address || !argument.trim() || !debateId) return;

    try {
      // Debate ID is required
      sendMessage(argument, topic, address, side);

      // Reset inactivity timer when user sends an argument
      resetInactivityTimer();

      // Create a temporary local representation of the argument
      // Note: The backend will assign the real ID and possibly add scores
      const newArgument: Argument = {
        id: Math.floor(Math.random() * 1000000) * 10000, // Temporary ID
        content: argument,
        side: side,
        created_at: new Date().toISOString(),
        player_id: address,
        debate_id: debateId,
        topic: topic
      };

      setDebateArguments(prev => [...prev, newArgument]);
    } catch (error) {
      console.error('Failed to send argument:', error);
    }
  };

  return (
    <div className="h-full max-w-5xl mx-auto flex flex-col">
      <InactivityModal isOpen={isInactive} onResume={handleResumeGame} />
      
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