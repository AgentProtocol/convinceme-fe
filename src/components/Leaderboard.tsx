import { useState, useEffect } from 'react';
import { Argument } from '../types';
import websocketService from '../services/websocketService';
import { usePrivy } from '@privy-io/react-auth';

interface LeaderboardProps {
  debateId: string;
  side1: string;
}

interface LeaderboardUpdateData {
  debate_id: string;
  leaderboard: Argument[];
}

interface VoteSubmissionState {
  [argumentId: string]: boolean; // Track which arguments are being voted on
}

export default function Leaderboard({ debateId, side1 }: LeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<Argument[]>([]);
  const [loading, setLoading] = useState(true);
  const [votingStates, setVotingStates] = useState<VoteSubmissionState>({});
  const [voteMessage, setVoteMessage] = useState<string>('');
  const { authenticated, getAccessToken } = usePrivy();

  // Fetch initial leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/debates/${debateId}/leaderboard?limit=10`
        );
        const data = await response.json();
        if (data.leaderboard) {
          setLeaderboard(data.leaderboard);
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [debateId]);

  // Subscribe to WebSocket updates
  useEffect(() => {
    const handleLeaderboardUpdate = (data: LeaderboardUpdateData) => {
      if (data.debate_id === debateId) {
        setLeaderboard(data.leaderboard);
      }
    };

    websocketService.on('leaderboard_update', handleLeaderboardUpdate);

    return () => {
      websocketService.off('leaderboard_update', handleLeaderboardUpdate);
    };
  }, [debateId]);

  // Handle vote submission
  const handleVote = async (
    argumentId: number,
    voteType: 'upvote' | 'downvote'
  ) => {
    if (!authenticated) {
      setVoteMessage('You must be logged in to vote');
      setTimeout(() => setVoteMessage(''), 3000);
      return;
    }

    // Set voting state to disable button during request
    setVotingStates((prev) => ({ ...prev, [argumentId]: true }));

    try {
      const accessToken = await getAccessToken();

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/arguments/${argumentId}/vote`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            vote_type: voteType,
            debate_id: debateId,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setVoteMessage(data.message || 'Vote submitted successfully');
        // Leaderboard will be updated via WebSocket
      } else {
        setVoteMessage(data.error || 'Failed to submit vote');
      }
    } catch (error) {
      console.error('Error voting:', error);
      setVoteMessage('Failed to submit vote');
    } finally {
      setVotingStates((prev) => ({ ...prev, [argumentId]: false }));
      setTimeout(() => setVoteMessage(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="bg-surface-light rounded-xl p-4 shadow-soft">
        <div className="text-center text-text-muted">
          Loading leaderboard...
        </div>
      </div>
    );
  }

  if (leaderboard.length === 0) {
    return (
      <div className="bg-surface-light rounded-xl p-4 shadow-soft">
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Top Arguments
        </h3>
        <div className="text-center text-text-muted">No arguments yet</div>
      </div>
    );
  }

  return (
    <div className="bg-surface-light rounded-xl p-4 shadow-soft">
      <h3 className="text-lg font-semibold text-text-primary mb-4">
        🏆 Top Arguments
      </h3>

      {voteMessage && (
        <div className="mb-3 px-3 py-2 rounded-lg bg-blue-100 text-blue-800 text-sm">
          {voteMessage}
        </div>
      )}

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {leaderboard.map((argument, index) => (
          <div
            key={argument.id}
            className="flex items-center gap-3 p-3 bg-surface rounded-lg border border-border-light hover:bg-surface-hover transition-colors"
          >
            {/* Rank */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
              <span className="text-primary font-semibold text-sm">
                {index + 1}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-text-primary">
                  {argument.player_id}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    argument.side === side1
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}
                >
                  {argument.side}
                </span>
              </div>
              <p className="text-sm text-text-secondary line-clamp-2">
                {argument.content}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-xs text-text-muted">
                  Score: {argument.score?.average?.toFixed(1) || 'N/A'}
                </span>
                <span className="text-xs text-text-muted">
                  👍 {argument.upvotes || 0} 👎 {argument.downvotes || 0}
                </span>
              </div>
            </div>

            {/* Voting Buttons */}
            {authenticated && (
              <div className="flex gap-1 flex-shrink-0">
                <button
                  onClick={() => handleVote(argument.id, 'upvote')}
                  disabled={votingStates[argument.id]}
                  className="p-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Upvote (+0.2 points)"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleVote(argument.id, 'downvote')}
                  disabled={votingStates[argument.id]}
                  className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 hover:text-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Downvote (-0.2 points)"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {!authenticated && (
        <div className="mt-3 text-center text-sm text-text-muted">
          Login to vote on arguments
        </div>
      )}
    </div>
  );
}
