import { useState, useEffect } from 'react';
import { useContractMeService, escrowUtils } from '../services/escrowService';

interface PrizePoolDisplayProps {
  className?: string;
}

export default function PrizePoolDisplay({
  className = '',
}: PrizePoolDisplayProps) {
  const [prizePoolAmount, setPrizePoolAmount] = useState<string>('0');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { createContractMeService, isWalletReady } = useContractMeService();

  const fetchPrizePool = async () => {
    try {
      setError(null);
      const service = await createContractMeService();
      if (!service) {
        setError('Wallet service not available');
        return;
      }

      const amount = await service.getPrizePoolAmount();
      setPrizePoolAmount(amount);
    } catch (err) {
      console.error('Error fetching prize pool:', err);
      setError('Failed to load prize pool');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isWalletReady) {
      setIsLoading(false);
      return;
    }

    // Initial fetch
    fetchPrizePool();

    // Set up polling every 5 seconds
    const interval = setInterval(() => {
      fetchPrizePool();
    }, 5000);

    return () => clearInterval(interval);
  }, [isWalletReady]);

  if (!isWalletReady) {
    return (
      <div className={`text-center text-sm text-gray-500 ${className}`}>
        💰 Prize Pool: Wallet not connected
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center text-sm text-red-500 ${className}`}>
        💰 Prize Pool: {error}
      </div>
    );
  }

  return (
    <div className={`text-center ${className}`}>
      <div className="text-sm font-semibold text-gray-700 flex items-center justify-center gap-2">
        <span className="text-yellow-500">💰</span>
        <span>Prize Pool:</span>
        {isLoading ? (
          <span className="text-gray-500">Loading...</span>
        ) : (
          <span className="text-green-600 font-bold">
            {escrowUtils.formatCHZ(prizePoolAmount)}
          </span>
        )}
      </div>
    </div>
  );
}
