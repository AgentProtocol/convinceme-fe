import React, { useState } from 'react';

interface ArgumentScoreDisplayProps {
  score: {
    strength: number;
    relevance: number;
    logic: number;
    truth: number;
    humor: number;
    average: number;
    explanation?: string;
  };
  className?: string;
}

const getScoreEmoji = (score: number) => {
  if (score >= 8) return '🔥'; // Excellent
  if (score >= 6) return '👍'; // Good
  if (score >= 4) return '👌'; // Okay
  if (score >= 2) return '👎'; // Poor
  return '💀'; // Very poor
};

const getScoreColor = (score: number) => {
  if (score >= 8) return 'text-green-600';
  if (score >= 6) return 'text-blue-600';
  if (score >= 4) return 'text-yellow-600';
  if (score >= 2) return 'text-orange-600';
  return 'text-red-600';
};

export default function ArgumentScoreDisplay({
  score,
  className = '',
}: ArgumentScoreDisplayProps) {
  const [showExplanation, setShowExplanation] = useState(false);

  const scoreItems = [
    { label: 'Strength', value: score.strength, emoji: '💪' },
    { label: 'Relevance', value: score.relevance, emoji: '🎯' },
    { label: 'Logic', value: score.logic, emoji: '🧠' },
    { label: 'Truth', value: score.truth, emoji: '✅' },
    { label: 'Humor', value: score.humor, emoji: '😄' },
  ];

  return (
    <div className={`bg-white rounded-lg p-3 shadow-sm border ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-700">
          Argument Score
        </span>
        <div className="flex items-center">
          <span className={`text-lg font-bold ${getScoreColor(score.average)}`}>
            {score.average.toFixed(1)}
          </span>
          <span className="ml-1 text-lg">{getScoreEmoji(score.average)}</span>
          {score.explanation && (
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="ml-2 w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-xs text-gray-600 hover:text-gray-800 transition-colors"
              title="View explanation"
            >
              ?
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 text-xs">
        {scoreItems.map((item) => (
          <div key={item.label} className="text-center">
            <div className="text-lg mb-1">{item.emoji}</div>
            <div className={`font-semibold ${getScoreColor(item.value)}`}>
              {item.value.toFixed(1)}
            </div>
            <div className="text-gray-500 text-xs">{item.label}</div>
          </div>
        ))}
      </div>

      {score.explanation && showExplanation && (
        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg relative">
          <div className="absolute -top-2 left-4 w-4 h-4 bg-blue-50 border-l border-t border-blue-200 transform rotate-45"></div>
          <div className="text-xs text-gray-700 leading-relaxed">
            "{score.explanation}"
          </div>
        </div>
      )}
    </div>
  );
}
