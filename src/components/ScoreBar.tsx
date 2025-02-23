import { useEffect, useState } from "react";
import websocketService from "../services/websocketService";

interface ScoreBarProps {
  // timeLeft: number;
  className?: string;
}

interface Conviction {
  agent1_score: number;     // 0-1 conviction score
  agent2_score: number;     // 0-1 conviction score
  overall_tension: number;  // 0-1 tension level
  dominant_agent: string;  // name of dominant speaker
  analysis_summary: string // brief analysis
}

export default function ScoreBar({
  // timeLeft,
  className = ""
}: ScoreBarProps) {
  const [side1Score, setSide1Score] = useState(100);
  const [side2Score, setSide2Score] = useState(100);

  useEffect(() => {
    const handleConviction = (conviction: Conviction) => {
      console.log(conviction);
      setSide1Score(conviction.agent1_score * 100);
      setSide2Score(conviction.agent2_score * 100);
    };

    websocketService.on('conviction', handleConviction);

    return () => {
      websocketService.off('conviction', handleConviction);
    };
  }, []);
  // Format time as mm:ss
  // const formatTime = (seconds: number) => {
  //   const mins = Math.floor(seconds / 60);
  //   const secs = seconds % 60;
  //   return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  // };

  // Calculate score bar percentage
  const scorePercentage = (side1Score / (side1Score + side2Score)) * 100;

  return (
    <div className={`py-3 ${className}`}>
      {/* <div className="text-center text-xl font-bold mb-3">
        {formatTime(timeLeft)}
      </div> */}
      <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
        <div className="relative h-full">
          <div
            className="absolute h-full bg-red-500"
            style={{ width: '100%' }}
          />
          <div
            className="absolute h-full bg-blue-500"
            style={{ width: `${scorePercentage}%` }}
          />
        </div>
      </div>
      <div className="flex justify-between mt-1.5 text-sm md:text-base">
        <div className="font-medium text-blue-700">{side1Score}</div>
        <div className="font-medium text-red-700">{side2Score}</div>
      </div>
    </div>
  );
} 