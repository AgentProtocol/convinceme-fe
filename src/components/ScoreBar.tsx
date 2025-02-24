import { useEffect, useState } from "react";
import websocketService from "../services/websocketService";

interface ScoreBarProps {
  // timeLeft: number;
  className?: string;
  side1: string;
  side2: string;
}

export default function ScoreBar({
  // timeLeft,
  side1,
  side2,
  className = ""
}: ScoreBarProps) {
  const [side1Score, setSide1Score] = useState(100);
  const [side2Score, setSide2Score] = useState(100);

  useEffect(() => {
    const fetchGameScore = async () => {
      const res = await fetch(import.meta.env.VITE_API_URL + '/api/gameScore');
      const data = await res.json();
      setSide1Score(data[side1]);
      setSide2Score(data[side2]);
    };

    const handleGameScore = (gameScore: Record<string, number>) => {
      setSide1Score(gameScore[side1]);
      setSide2Score(gameScore[side2]);
    };

    fetchGameScore();
    websocketService.on('game_score', handleGameScore);

    return () => {
      websocketService.off('game_score', handleGameScore);
    };
  }, []);

  // Calculate score bar percentage
  const scorePercentage = (side1Score / (side1Score + side2Score)) * 100;

  return (
    <div className={`py-3 ${className}`}>
      {/* <div className="text-center text-xl font-bold mb-3">
        {formatTime(timeLeft)}
      </div> */}
      <div className="h-8 bg-gray-100 rounded-xl overflow-hidden shadow-sm">
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
      <div className="flex justify-between mt-2 text-sm md:text-base">
        <div className="font-semibold text-blue-700">{Math.round(side1Score)}</div>
        <div className="font-semibold text-red-700">{Math.round(side2Score)}</div>
      </div>
    </div>
  );
} 