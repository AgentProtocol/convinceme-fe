interface PreviewScoreBarProps {
  side1Score: number;
  side2Score: number;
  className?: string;
}

export default function PreviewScoreBar({ side1Score, side2Score, className = "" }: PreviewScoreBarProps) {
  // Calculate score bar percentage
  const scorePercentage = (side1Score / (side1Score + side2Score)) * 100;

  return (
    <div className={`py-2 ${className}`}>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
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
      <div className="flex justify-between mt-1.5 items-center text-xs font-medium">
        <div className="text-blue-700">{Math.round(side1Score)}</div>
        <div className="text-red-700">{Math.round(side2Score)}</div>
      </div>
    </div>
  );
} 