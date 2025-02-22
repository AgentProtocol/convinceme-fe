interface ScoreBarProps {
  side1Score: number;
  side2Score: number;
  // timeLeft: number;
  className?: string;
}

export default function ScoreBar({ 
  side1Score, 
  side2Score, 
  // timeLeft,
  className = ""
}: ScoreBarProps) {
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