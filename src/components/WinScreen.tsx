import { useEffect, useState } from 'react';

interface WinScreenProps {
  readonly winnerSide: string;
  readonly loserSide: string;
  readonly onClose: () => void;
  readonly onReturnToLobby: () => void;
}

export default function WinScreen({ winnerSide, loserSide, onClose, onReturnToLobby }: WinScreenProps) {
  const [showConfetti, setShowConfetti] = useState(true);
  
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
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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
        {/* Trophy Icon */}
        <div className="text-6xl mb-4">🏆</div>
        
        {/* Winner Announcement */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Debate Complete!
        </h1>
        
        <div className="mb-6">
          <div className="text-xl font-semibold text-emerald-600 mb-2">
            🎉 {winnerSide} Wins! 🎉
          </div>
          <div className="text-sm text-gray-600">
            Better luck next time, {loserSide}
          </div>
        </div>

        {/* Victory Message */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
          <p className="text-emerald-800 text-sm">
            Congratulations! The arguments were compelling and the debate was intense. 
            The winning side demonstrated superior logic, relevance, and persuasive power.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
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
