import { useState, useEffect } from 'react';
import { Argument } from '../types';
import websocketService from '../services/websocketService';

interface LeaderboardProps {
  debateId: string;
  side1: string;
}

interface LeaderboardUpdateData {
  debate_id: string;
  leaderboard: Argument[];
}

export default function Leaderboard({ debateId, side1 }: LeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<Argument[]>([]);
  const [loading, setLoading] = useState(true);

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
        console.error('Failed to fetch leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    if (debateId) {
      fetchLeaderboard();
    }
  }, [debateId]);

  // Listen for real-time leaderboard updates
  useEffect(() => {
    const handleLeaderboardUpdate = (data: LeaderboardUpdateData) => {
      if (data.debate_id === debateId && data.leaderboard) {
        setLeaderboard(data.leaderboard);
      }
    };

    websocketService.on('leaderboard_update', handleLeaderboardUpdate);

    return () => {
      websocketService.off('leaderboard_update', handleLeaderboardUpdate);
    };
  }, [debateId]);

  const formatPlayerName = (playerId: string) => {
    // Format player ID to show only first and last few characters
    if (!playerId) return 'Anonymous';
    if (playerId.length <= 10) return playerId;
    return `${playerId.slice(0, 6)}...${playerId.slice(-4)}`;
  };

  const getSideBadgeStyle = (side: string) => {
    if (!side) return 'bg-gray-100 text-gray-800';
    return side === side1
      ? 'bg-blue-100 text-blue-800'
      : 'bg-red-100 text-red-800';
  };

  const getScoreColor = (average: number) => {
    if (average >= 8) return 'text-emerald-600 font-bold';
    if (average >= 6) return 'text-blue-600 font-semibold';
    if (average >= 4) return 'text-yellow-600';
    return 'text-gray-600';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-soft p-4 mb-3">
        <h3 className="text-lg font-bold text-gray-900 mb-3">
          🏆 Top Arguments
        </h3>
        <div className="text-center text-gray-500 py-4">
          Loading leaderboard...
        </div>
      </div>
    );
  }

  if (leaderboard.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-soft p-4 mb-3">
        <h3 className="text-lg font-bold text-gray-900 mb-3">
          🏆 Top Arguments
        </h3>
        <div className="text-center text-gray-500 py-4">
          No arguments yet. Be the first to contribute!
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-soft p-4 mb-3">
      <h3 className="text-lg font-bold text-gray-900 mb-3">🏆 Top Arguments</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-1 font-semibold text-gray-700 w-8">
                #
              </th>
              <th className="text-left py-2 px-2 font-semibold text-gray-700">
                Player
              </th>
              <th className="text-left py-2 px-2 font-semibold text-gray-700">
                Argument
              </th>
              <th className="text-left py-2 px-1 font-semibold text-gray-700 w-16">
                Side
              </th>
              <th className="text-right py-2 px-1 font-semibold text-gray-700 w-16">
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((argument, index) => (
              <tr
                key={argument.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-2 px-1">
                  <span
                    className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                      index === 0
                        ? 'bg-yellow-100 text-yellow-800'
                        : index === 1
                          ? 'bg-gray-100 text-gray-700'
                          : index === 2
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-gray-50 text-gray-600'
                    }`}
                  >
                    {index + 1}
                  </span>
                </td>
                <td className="py-2 px-2">
                  <span className="text-gray-700 font-medium">
                    {formatPlayerName(argument.player_id)}
                  </span>
                </td>
                <td className="py-2 px-2">
                  <span
                    className="text-gray-800 line-clamp-2"
                    title={argument.content}
                  >
                    {argument.content.length > 60
                      ? `${argument.content.substring(0, 60)}...`
                      : argument.content}
                  </span>
                </td>
                <td className="py-2 px-1">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getSideBadgeStyle(argument.side)}`}
                  >
                    {argument.side === side1 ? 'Pro' : 'Con'}
                  </span>
                </td>
                <td className="py-2 px-1 text-right">
                  <span
                    className={`font-semibold ${getScoreColor(argument.score?.average || 0)}`}
                  >
                    {argument.score?.average?.toFixed(1) || 'N/A'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {leaderboard.length === 10 && (
        <div className="text-center text-xs text-gray-500 mt-2">
          Showing top 10 arguments
        </div>
      )}
    </div>
  );
}
