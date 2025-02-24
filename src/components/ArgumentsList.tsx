import { useState, useEffect, useRef } from 'react';

export interface Argument {
  id: number;
  text: string;
  score: number;
  side: string;
  timestamp: Date;
  userAddress: string;
}

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
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
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
      <div className="space-y-3 px-4 py-4">
        {debateArguments.map((arg) => (
          <div 
            key={arg.id} 
            className={`p-3 rounded-lg ${
              arg.side === side1 ? 'bg-blue-50' : 'bg-red-50'
            }`}
          >
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm mb-1.5">
              <span className={`font-medium ${
                arg.side === side1 ? 'text-blue-700' : 'text-red-700'
              }`}>
                {formatAddress(arg.userAddress)}
              </span>
              <span className="text-gray-500">
                • {formatRelativeTime(arg.timestamp)}
              </span>
              <span className={`ml-auto font-medium ${
                arg.score >= 70 ? 'text-green-600' :
                arg.score >= 50 ? 'text-blue-600' : 'text-gray-600'
              }`}>
                Score: {arg.score > 0 ? `+${arg.score}` : arg.score}
              </span>
            </div>
            <div>
              <p className="text-gray-800 text-sm md:text-base leading-relaxed">
                {expandedArguments.includes(arg.id) ? arg.text : truncateText(arg.text)}
                {" "}{arg.text.split(' ').length > 10 && (
                <button
                  onClick={() => toggleExpand(arg.id)}
                  className="text-sm text-blue-600 hover:text-blue-800 mt-1 font-medium"
                >
                  {expandedArguments.includes(arg.id) ? 'Show less' : 'Show more'}
                </button>
              )}
              </p>
            </div>
            <div className="mt-2 flex items-center gap-x-2 text-sm text-gray-500">
              <span className="font-medium">
                {arg.side}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 