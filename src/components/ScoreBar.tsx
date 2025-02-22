interface ScoreBarProps {
  side1: string;
  side2: string;
  side1Score: number;
  side2Score: number;
  timeLeft: number;
  className?: string;
}

export default function ScoreBar({ 
  side1, 
  side2, 
  side1Score, 
  side2Score, 
  timeLeft,
  className = ""
}: ScoreBarProps) {
  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate score bar percentage
  const scorePercentage = (side1Score / (side1Score + side2Score)) * 100;

  return (
    <div className={`py-3 ${className}`}>
      <div className="text-center text-xl font-bold mb-3">
        {formatTime(timeLeft)}
      </div>
      <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-red-500"
          style={{ width: `${scorePercentage}%` }}
        />
      </div>
      <div className="flex justify-between mt-1.5 text-sm md:text-base">
        <div className="font-medium text-blue-700">{side1}: {side1Score}</div>
        <div className="font-medium text-red-700">{side2}: {side2Score}</div>
      </div>
    </div>
  );
} 