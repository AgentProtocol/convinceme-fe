import { useEffect, useState } from 'react';
import agent1Image from '../assets/agent1.png';
import agent2Image from '../assets/agent2.png';

interface WinScreenProps {
  readonly winnerSide: string;
  readonly loserSide: string;
  readonly winnerPlayer?: {
    address: string;
    email?: string;
  };
  readonly onClose: () => void;
  readonly onReturnToLobby: () => void;
  readonly onRestartMatch: () => void;
  readonly side1: string;
}

export default function WinScreen({ winnerSide, loserSide, winnerPlayer, onClose, onReturnToLobby, onRestartMatch, side1 }: WinScreenProps) {
  const winnerAvatar = winnerSide === side1 ? agent1Image : agent2Image;
  const [showConfetti, setShowConfetti] = useState(true);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  
  // Generate stable confetti positions once
  const [confettiItems] = useState(() => 
    Array.from({ length: 50 }, (_, i) => ({
      id: `confetti-${i}`,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
    }))
  );

  useEffect(() => {
    // Hide confetti after 3 seconds
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    // 5-minute countdown timer with auto-redirect
    const countdownTimer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up, redirect to home
          onReturnToLobby();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(confettiTimer);
      clearInterval(countdownTimer);
    };
  }, [onReturnToLobby]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Format address to show first 6 and last 4 characters
  const formatAddress = (address: string) => {
    if (!address || address.length < 10) {
      return address;
    }
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Confetti animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {confettiItems.map((item) => (
            <div
              key={item.id}
              className="absolute animate-bounce"
              style={{
                left: `${item.left}%`,
                animationDelay: `${item.delay}s`,
                animationDuration: `${item.duration}s`,
              }}
            >
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center transform animate-in zoom-in-95 duration-300">
        {/* Winner Avatar */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img 
              src={winnerAvatar} 
              alt={`${winnerSide} avatar`}
              className="w-24 h-24 rounded-full object-cover border-4 border-yellow-400 shadow-lg"
            />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-lg">🏆</div>
          </div>
        </div>
        
        {/* Winner Announcement */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Victory!
        </h1>
        
        <div className="mb-6">
          <div className="text-xl font-semibold text-emerald-600 mb-2">
            {winnerSide} Wins!
          </div>
          <div className="text-sm text-gray-600 mb-3">
            Better luck next time, {loserSide}
          </div>

          {/* Winner Player Information */}
          {winnerPlayer && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
              <div className="font-medium text-blue-900 mb-1">Winner Details:</div>
              <div className="text-blue-800">
                <div>Address: <span className="font-mono">{formatAddress(winnerPlayer.address)}</span></div>
                {winnerPlayer.email && (
                  <div>Email: {winnerPlayer.email}</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Victory Message */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
          <p className="text-emerald-800 text-sm">
            Congratulations! The arguments were compelling and the debate was intense. 
            The winning side demonstrated superior logic, relevance, and persuasive power.
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-6">
          <div className="text-xs text-gray-600 mb-1">Auto-redirect in:</div>
          <div className="text-lg font-mono font-bold text-gray-800">{formatTime(timeLeft)}</div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onRestartMatch}
            className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 active:bg-emerald-800 transition-colors font-medium shadow-sm"
          >
            Start New Debate
          </button>
          
          <button
            onClick={onReturnToLobby}
            className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 active:bg-primary-800 transition-colors font-medium shadow-sm"
          >
            Return to Lobby
          </button>
          
          <button
            onClick={onClose}
            className="w-full px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
