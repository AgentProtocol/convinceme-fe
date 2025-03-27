import { useState, useEffect, useRef } from 'react';
import { Argument } from './GameUI';

interface ArgumentsListProps {
  arguments: Argument[];
  side1: string;
}

export default function ArgumentsList({ arguments: debateArguments, side1 }: ArgumentsListProps) {
  const [expandedArguments, setExpandedArguments] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !shouldAutoScroll) return;

    container.scrollTop = container.scrollHeight;
  }, [debateArguments, shouldAutoScroll]);

  // Add scroll event listener to check if we should auto-scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      // Consider "near bottom" if within 100px of the bottom
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShouldAutoScroll(isNearBottom);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Format relative time
  const formatRelativeTime = (date: string) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  // Format address to show only first and last few characters
  const formatAddress = (address: string) => {
    if (!address) return '';
    return address.length > 13 ? `${address.slice(0, 6)}...${address.slice(-4)}` : address;
  };

  // Truncate text and add "..." if needed
  const truncateText = (text: string, wordCount = 6) => {
    const words = text.split(' ');
    if (words.length <= wordCount) return text;
    return words.slice(0, wordCount).join(' ') + '...';
  };

  const toggleExpand = (id: number) => {
    setExpandedArguments(prev => 
      prev.includes(id) 
        ? prev.filter(argId => argId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="h-full overflow-y-auto" ref={containerRef}>
      <div className="space-y-2 p-3">
        {debateArguments.map((arg) => (
          <div 
            key={arg.id} 
            className={`p-2.5 rounded-xl border transition-all ${
              !arg.side ? 'bg-gray-50/50 border-gray-100' : arg.side === side1 
                ? 'bg-blue-50/50 border-blue-100' 
                : 'bg-red-50/50 border-red-100'
            }`}
          >
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs mb-1.5">
              <span className={`font-medium ${
                !arg.side ? 'text-gray-700' : arg.side === side1 ? 'text-blue-700' : 'text-red-700'
              }`}>
                {formatAddress(arg.player_id)}
              </span>
              <span className="text-gray-500">
                • {formatRelativeTime(arg.created_at)}
              </span>
              {!arg.score ? (
                <span className={`ml-auto font-medium text-gray-600`}>
                  Score: Calculating...
                </span>
              ) : (
                <span className={`ml-auto font-medium ${
                  arg.score.average >= 70 ? 'text-emerald-600' :
                  arg.score.average >= 50 ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  Score: {arg.score.average > 0 ? `+${Math.round(arg.score.average)}` : Math.round(arg.score.average)}
                </span>
              )}
            </div>
            <div>
              <p className="text-gray-700 text-sm leading-relaxed">
                {expandedArguments.includes(arg.id) ? arg.content : truncateText(arg.content, 6)}
                {" "}{arg.content.split(' ').length > 6 && (
                <button
                  onClick={() => toggleExpand(arg.id)}
                  className={`text-xs hover:underline font-medium ${
                    !arg.side ? 'text-gray-600 hover:text-gray-800' : arg.side === side1 ? 'text-blue-600 hover:text-blue-800' : 'text-red-600 hover:text-red-800'
                  }`}
                >
                  {expandedArguments.includes(arg.id) ? 'Show less' : 'Show more'}
                </button>
              )}
              </p>
            </div>
            <div className="mt-1.5 flex items-center gap-x-2">
              {arg.score && (
                <div className="ml-auto flex items-center justify-end gap-x-3 text-xs text-gray-500">
                  <span title="Strength">💪 {Math.round(arg.score.strength)}</span>
                  <span title="Relevance">🎯 {Math.round(arg.score.relevance)}</span>
                  <span title="Logic">🧠 {Math.round(arg.score.logic)}</span>
                  <span title="Truth">✅ {Math.round(arg.score.truth)}</span>
                  <span title="Humor">😄 {Math.round(arg.score.humor)}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 