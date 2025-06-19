import { useEffect, useState } from 'react';
import websocketService from '../services/websocketService';
import { STRK_ABI, formatTokenAmount } from '../contracts';
import { CONTRACT_ADDRESS, STRK_ADDRESS } from '../contracts';
import { useCall } from '@starknet-react/core';

interface ScoreBarProps {
  // timeLeft: number;
  className?: string;
  side1: string;
  side2: string;
  topic?: string;
}

interface FloatingScoreProps {
  side: 'left' | 'right';
  onComplete: () => void;
  score: number;
}

function FloatingScore({ side, onComplete, score }: FloatingScoreProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`
        absolute -translate-y-8 animate-float-up text-2xl font-bold
        ${side === 'left' ? 'left-0 text-blue-600' : 'right-0 text-red-600'}
        pointer-events-none select-none
      `}
    >
      {score > 0 ? `+${score}` : score}
    </div>
  );
}

export default function ScoreBar({
  // timeLeft,
  side1,
  side2,
  className = '',
  topic,
}: ScoreBarProps) {
  const [side1Score, setSide1Score] = useState(100);
  const [side2Score, setSide2Score] = useState(100);
  const [floatingScores, setFloatingScores] = useState<
    { id: string; side: 'left' | 'right'; score: number }[]
  >([]);

  // Read the contract's STRK balance (prize pot)
  const { data: balanceResult } = useCall({
    address: STRK_ADDRESS,
    abi: STRK_ABI,
    functionName: 'balanceOf',
    args: [CONTRACT_ADDRESS],
    watch: true,
    refetchInterval: 5000,
  });
  const prizePot = balanceResult
    ? formatTokenAmount(BigInt(balanceResult.toString()))
    : null;

  useEffect(() => {
    const fetchGameScore = async () => {
      try {
        const res = await fetch(
          import.meta.env.VITE_API_URL + '/api/gameScore'
        );
        const data = await res.json();
        console.log('Fetched initial game score:', data);
        setSide1Score(data[side1] ?? 100);
        setSide2Score(data[side2] ?? 100);
      } catch (error) {
        console.error('Failed to fetch initial game score:', error);
        // Keep default values of 100
      }
    };

    const handleGameScore = (gameScore: Record<string, number>) => {
      console.log('Received game score update:', gameScore, 'sides:', {
        side1,
        side2,
      });

      const newSide1Score = gameScore[side1];
      const newSide2Score = gameScore[side2];

      if (newSide1Score !== undefined && newSide2Score !== undefined) {
        // Store previous scores for calculating change
        setSide1Score((currentSide1Score) => {
          const change = newSide1Score - currentSide1Score;
          if (change !== 0) {
            // Cap the HP change to be more reasonable (max ±10 points per change)
            const cappedChange = Math.max(-10, Math.min(10, change));
            setFloatingScores((prev) => [
              ...prev,
              { id: crypto.randomUUID(), side: 'left', score: cappedChange },
            ]);
            setFloatingScores((prev) => [
              ...prev,
              { id: crypto.randomUUID(), side: 'right', score: -cappedChange },
            ]);
          }
          return newSide1Score;
        });

        setSide2Score(newSide2Score);
      } else {
        console.warn('Game score update missing agent scores:', {
          gameScore,
          side1,
          side2,
        });
      }
    };

    fetchGameScore();
    websocketService.on('game_score', handleGameScore);

    return () => {
      websocketService.off('game_score', handleGameScore);
    };
  }, [side1, side2]); // Re-run when agent names change

  // Calculate score bar percentage
  const scorePercentage = (side1Score / (side1Score + side2Score)) * 100;

  return (
    <div className={`py-2 ${className} relative`}>
      {topic && (
        <div className="text-center text-base font-bold text-gray-800 mb-2">
          {topic}
        </div>
      )}
      {/* <div className="text-center text-xl font-bold mb-3">
        {formatTime(timeLeft)}
      </div> */}
      <div className="text-center mb-4">
        {prizePot ? (
          <div className="text-center mb-1">
            <div className="text-xl font-bold text-primary-800">
              {prizePot} STRK
            </div>
            <div className="text-xs text-gray-600 font-medium mt-1 mb-1">
              Prize pool
            </div>
          </div>
        ) : (
          <div className="h-7 w-28 mx-auto bg-gray-200 animate-pulse rounded-lg" />
        )}
      </div>
      {floatingScores.map((score) => (
        <FloatingScore
          key={score.id}
          side={score.side}
          score={score.score}
          onComplete={() =>
            setFloatingScores((scores) =>
              scores.filter((s) => s.id !== score.id)
            )
          }
        />
      ))}
      <div className="h-6 bg-gray-100 rounded-xl overflow-hidden shadow-sm">
        <div className="relative h-full">
          <div
            className="absolute h-full bg-gradient-to-r from-red-500 to-red-600"
            style={{ width: '100%' }}
          />
          <div
            className="absolute h-full bg-gradient-to-r from-blue-500 to-blue-600"
            style={{ width: `${scorePercentage}%` }}
          />
        </div>
      </div>
      <div className="flex justify-between mt-1.5 items-center">
        <div className="font-semibold text-blue-700 text-sm">
          {Math.round(side1Score)}
        </div>
        <div className="font-semibold text-red-700 text-sm">
          {Math.round(side2Score)}
        </div>
      </div>
    </div>
  );
}
