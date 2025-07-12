import { useState, useEffect, useRef } from 'react';
import { Argument } from '../types';
import { Transcript } from './TranscriptList';
import ArgumentScoreDisplay from './ArgumentScoreDisplay';
import { usePrivy } from '@privy-io/react-auth';

// Unified message type that can represent both arguments and transcripts
export interface UnifiedMessage {
  id: string;
  type: 'argument' | 'transcript';
  content: string;
  author: string;
  createdAt: string;
  side?: string; // For arguments
  isPlayer?: boolean; // For transcripts
  score?: {
    strength: number;
    relevance: number;
    logic: number;
    truth: number;
    humor: number;
    average: number;
    explanation?: string;
  };
}

interface UnifiedChatListProps {
  arguments: Argument[];
  transcripts: Transcript[];
  side1: string;
}

export default function UnifiedChatList({
  arguments: debateArguments,
  transcripts,
  side1,
}: UnifiedChatListProps) {
  const [expandedMessages, setExpandedMessages] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const { user } = usePrivy();

  // Convert arguments and transcripts to unified messages
  const unifiedMessages: UnifiedMessage[] = [
    ...debateArguments
      .filter((arg) => arg.score) // Only show arguments that have been scored
      .map((arg): UnifiedMessage => {
        return {
          id: `arg-${arg.id}`,
          type: 'argument',
          content: arg.content,
          author: arg.player_id,
          createdAt: arg.created_at,
          side: arg.side,
          score: arg.score,
        };
      }),
    ...transcripts
      .filter((transcript) => transcript.scores?.argument) // Only show transcripts that have been scored
      .map((transcript): UnifiedMessage => {
        return {
          id: `transcript-${transcript.id}`,
          type: 'transcript',
          content: transcript.transcript,
          author: transcript.username,
          createdAt: transcript.createdAt.toISOString(),
          isPlayer: transcript.isPlayer,
          score: transcript.scores?.argument,
        };
      }),
  ].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !shouldAutoScroll) {
      return;
    }

    container.scrollTop = container.scrollHeight;
  }, [unifiedMessages, shouldAutoScroll]);

  // Add scroll event listener to check if we should auto-scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

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
    const diffInSeconds = Math.floor(
      (now.getTime() - new Date(date).getTime()) / 1000
    );

    if (diffInSeconds < 60) {
      return 'just now';
    }
    if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}m ago`;
    }
    if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    }
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  // Format address to show only first and last few characters
  const formatAddress = (address: string) => {
    if (!address) {
      return '';
    }
    return address.length > 13
      ? `${address.slice(0, 6)}...${address.slice(-4)}`
      : address;
  };

  // Check if a message is from the current user and get Twitter info
  const getTwitterInfo = (message: UnifiedMessage) => {
    if (!user) return null;

    const currentUserAddress =
      user?.id || user?.email?.address || user?.wallet?.address;

    // Check if this message is from the current user
    const isCurrentUser =
      message.type === 'argument' && message.author === currentUserAddress;

    if (isCurrentUser && user.twitter?.username) {
      console.log('Current user Twitter info:', user.twitter.username);
      return {
        username: user.twitter.username,
        avatarUrl: `https://unavatar.io/twitter/${user.twitter.username}`,
      };
    }

    // For transcript messages, check if the username looks like a Twitter username
    // and the message is from a player (not AI agent)
    if (message.type === 'transcript' && message.isPlayer && message.author) {
      // Check if the author looks like a Twitter username (no @ symbol, reasonable length)
      const cleanUsername = message.author.replace('@', '');
      if (
        cleanUsername.length > 0 &&
        cleanUsername.length <= 15 &&
        !cleanUsername.includes('.') &&
        !cleanUsername.includes(' ')
      ) {
        console.log(
          'Detected Twitter username from transcript:',
          cleanUsername
        );
        return {
          username: cleanUsername,
          avatarUrl: `https://unavatar.io/twitter/${cleanUsername}`,
        };
      }
    }

    console.log(
      'No Twitter info found for message:',
      message.author,
      message.type
    );
    return null;
  };

  // Get display name for a message
  const getDisplayName = (message: UnifiedMessage) => {
    const twitterInfo = getTwitterInfo(message);

    if (twitterInfo) {
      return `@${twitterInfo.username}`;
    }

    if (message.type === 'transcript') {
      return message.author;
    }

    return formatAddress(message.author);
  };

  // Truncate text and add "..." if needed
  const truncateText = (text: string, wordCount = 16) => {
    const words = text.split(' ');
    if (words.length <= wordCount) {
      return text;
    }
    return words.slice(0, wordCount).join(' ') + '...';
  };

  const toggleExpand = (id: string) => {
    setExpandedMessages((prev) =>
      prev.includes(id) ? prev.filter((msgId) => msgId !== id) : [...prev, id]
    );
  };

  const getMessageStyle = (message: UnifiedMessage) => {
    if (message.type === 'transcript') {
      if (message.isPlayer) {
        // Player message in transcript - use gray styling like argument messages
        return 'bg-gray-50/50 border-gray-100';
      }
      // AI Agent messages - use side-based colors
      return message.author.includes(side1)
        ? 'bg-blue-50/50 border-blue-100' // Side 1 AI agent
        : 'bg-red-50/50 border-red-100'; // Side 2 AI agent
    }

    // User argument messages - use existing color scheme
    if (!message.side) {
      return 'bg-gray-50/50 border-gray-100';
    }
    return message.side === side1
      ? 'bg-blue-50/50 border-blue-100'
      : 'bg-red-50/50 border-red-100';
  };

  const getAuthorStyle = (message: UnifiedMessage) => {
    if (message.type === 'transcript') {
      if (message.isPlayer) {
        // Player message in transcript - use gray styling like argument messages
        return 'text-gray-700';
      }
      // AI Agent messages - use side-based colors
      return message.author.includes(side1)
        ? 'text-blue-700' // Side 1 AI agent
        : 'text-red-700'; // Side 2 AI agent
    }

    if (!message.side) {
      return 'text-gray-700';
    }
    return message.side === side1 ? 'text-blue-700' : 'text-red-700';
  };

  const getExpandButtonStyle = (message: UnifiedMessage) => {
    if (message.type === 'transcript') {
      if (message.isPlayer) {
        // Player message in transcript - use gray styling like argument messages
        return 'text-gray-600 hover:text-gray-800';
      }
      // AI Agent messages - use side-based colors
      return message.author.includes(side1)
        ? 'text-blue-600 hover:text-blue-800' // Side 1 AI agent
        : 'text-red-600 hover:text-red-800'; // Side 2 AI agent
    }

    if (!message.side) {
      return 'text-gray-600 hover:text-gray-800';
    }
    return message.side === side1
      ? 'text-blue-600 hover:text-blue-800'
      : 'text-red-600 hover:text-red-800';
  };

  const getMessageTypeIndicator = (message: UnifiedMessage) => {
    if (message.type === 'transcript') {
      // For transcript messages, check if it's a player message or AI agent message
      if (message.isPlayer) {
        // Player message in transcript
        return (
          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">
            Player
          </span>
        );
      }

      // AI Agent message - use side-based colors
      const isAgentSide1 = message.author.includes(side1);
      return (
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${
            isAgentSide1
              ? 'bg-blue-100 text-blue-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          AI Agent
        </span>
      );
    }

    // All argument messages should be labeled as Player
    return (
      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">
        Player
      </span>
    );
  };

  const getScoreColor = (average: number) => {
    if (average >= 70) {
      return 'text-emerald-600';
    }
    if (average >= 50) {
      return 'text-blue-600';
    }
    return 'text-gray-600';
  };

  return (
    <div className="h-full overflow-y-auto" ref={containerRef}>
      <div className="space-y-2 p-3">
        {unifiedMessages.map((message) => {
          const twitterInfo = getTwitterInfo(message);

          return (
            <div
              key={message.id}
              className={`p-2.5 rounded-xl border transition-all ${getMessageStyle(message)}`}
            >
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs mb-1.5">
                {/* Twitter Avatar */}
                {twitterInfo && (
                  <img
                    src={twitterInfo.avatarUrl}
                    alt={`@${twitterInfo.username} avatar`}
                    className="w-6 h-6 rounded-full border border-gray-200"
                    onLoad={() => {
                      console.log(
                        'Avatar loaded successfully for:',
                        twitterInfo.username
                      );
                    }}
                    onError={(e) => {
                      console.log(
                        'Avatar failed to load for:',
                        twitterInfo.username,
                        'URL:',
                        e.currentTarget.src
                      );
                      // Try multiple fallback URLs
                      const fallbackUrls = [
                        `https://github.com/${twitterInfo.username}.png`,
                        `https://api.dicebear.com/7.x/initials/svg?seed=${twitterInfo.username}`,
                        `https://ui-avatars.com/api/?name=${twitterInfo.username}&background=1d4ed8&color=fff&size=24`,
                      ];

                      const currentSrc = e.currentTarget.src;
                      const currentIndex = fallbackUrls.findIndex((url) =>
                        currentSrc.includes(url)
                      );

                      if (currentIndex < fallbackUrls.length - 1) {
                        const nextUrl = fallbackUrls[currentIndex + 1];
                        console.log('Trying fallback URL:', nextUrl);
                        e.currentTarget.src = nextUrl;
                      } else {
                        console.log('All avatar URLs failed, hiding avatar');
                        e.currentTarget.style.display = 'none';
                      }
                    }}
                  />
                )}

                {/* Debug: Show when Twitter info is detected */}
                {twitterInfo && (
                  <div
                    className="text-xs text-blue-500 font-mono"
                    style={{ fontSize: '8px' }}
                  >
                    🐦
                  </div>
                )}

                <span className={`font-medium ${getAuthorStyle(message)}`}>
                  {getDisplayName(message)}
                </span>
                {getMessageTypeIndicator(message)}
                <span className="text-gray-500">
                  • {formatRelativeTime(message.createdAt)}
                </span>
                {message.score && (
                  <span
                    className={`ml-auto font-medium text-xs ${getScoreColor(message.score.average)}`}
                  >
                    Score:{' '}
                    {message.score.average > 0
                      ? `+${Math.round(message.score.average)}`
                      : Math.round(message.score.average)}
                  </span>
                )}
              </div>
              <div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {expandedMessages.includes(message.id)
                    ? message.content
                    : truncateText(message.content, 12)}{' '}
                  {message.content.split(' ').length > 12 && (
                    <button
                      onClick={() => toggleExpand(message.id)}
                      className={`text-xs hover:underline font-medium ${getExpandButtonStyle(message)}`}
                    >
                      {expandedMessages.includes(message.id)
                        ? 'Show less'
                        : 'Show more'}
                    </button>
                  )}
                </p>
              </div>
              {message.score && (
                <div className="mt-1.5">
                  {message.type === 'transcript' ? (
                    <ArgumentScoreDisplay
                      score={message.score}
                      className="max-w-md text-xs"
                    />
                  ) : (
                    <div className="flex items-center justify-end gap-x-2 text-xs text-gray-400">
                      <span title="Strength">
                        💪 {Math.round(message.score.strength)}
                      </span>
                      <span title="Relevance">
                        🎯 {Math.round(message.score.relevance)}
                      </span>
                      <span title="Logic">
                        🧠 {Math.round(message.score.logic)}
                      </span>
                      <span title="Truth">
                        ✅ {Math.round(message.score.truth)}
                      </span>
                      <span title="Humor">
                        😄 {Math.round(message.score.humor)}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
