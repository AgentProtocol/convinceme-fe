import { useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useContractMeService, escrowUtils } from '../services/escrowService';
import { IS_GAME_DISABLED } from '../constants';

interface ArgumentInputProps {
  onSubmit: (argument: string, side: string) => void;
  disabled?: boolean;
  side1: string;
  side2: string;
}

export default function ArgumentInput({
  onSubmit,
  disabled,
  side1,
  side2,
}: ArgumentInputProps) {
  const [newArgument, setNewArgument] = useState('');
  const { user } = usePrivy();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentCost, setCurrentCost] = useState<string>('0');
  const [isLoadingCost, setIsLoadingCost] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { createContractMeService, isWalletReady } = useContractMeService();
  const address = user?.id || user?.email?.address || user?.wallet?.address;

  useEffect(() => {
    if (isWalletReady) {
      loadCurrentCost();
    }
  }, [isWalletReady]);

  const loadCurrentCost = async () => {
    try {
      setIsLoadingCost(true);
      const service = await createContractMeService();
      if (!service) return;

      const cost = await service.getActionCost();
      setCurrentCost(cost);
    } catch (err) {
      console.error('Error loading current cost:', err);
    } finally {
      setIsLoadingCost(false);
    }
  };

  const handleSubmit = async (selectedSide: string) => {
    if (!newArgument.trim() || !address || IS_GAME_DISABLED) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // First, perform the buy-in
      const service = await createContractMeService();
      if (!service) {
        throw new Error('Wallet service not available');
      }

      await service.buyIn();

      // Then submit the argument to the debate system
      onSubmit(newArgument, selectedSide);
      setNewArgument('');

      // Refresh the cost for next argument
      await loadCurrentCost();
    } catch (err) {
      console.error('Error submitting argument:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to submit argument'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Separate disabled states for input vs buttons (this is the key fix)
  const isInputDisabled =
    disabled || isSubmitting || IS_GAME_DISABLED || !isWalletReady;

  const isButtonDisabled =
    disabled ||
    !newArgument.trim() ||
    !address ||
    isSubmitting ||
    IS_GAME_DISABLED ||
    !isWalletReady;

  return (
    <div>
      {/* Minimal cost display */}
      {isWalletReady && (
        <div className="mb-3 text-sm text-gray-600">
          Cost:{' '}
          {isLoadingCost
            ? 'Loading...'
            : escrowUtils.formatCHZ(currentCost)}{' '}
        </div>
      )}

      {/* Argument Input */}
      <div className="mb-4">
        <textarea
          value={newArgument}
          onChange={(e) => setNewArgument(e.target.value)}
          placeholder="Enter your argument here..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-transparent resize-none"
          rows={2}
          disabled={isInputDisabled}
        />
      </div>

      {/* Side Selection Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleSubmit(side1)}
          disabled={isButtonDisabled}
          className="flex flex-col items-center justify-center p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-sm">Support</span>
          <span className="font-bold">{side1}</span>
          {isSubmitting && <span className="text-xs mt-1">Processing...</span>}
        </button>

        <button
          onClick={() => handleSubmit(side2)}
          disabled={isButtonDisabled}
          className="flex flex-col items-center justify-center p-4 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-sm">Support</span>
          <span className="font-bold">{side2}</span>
          {isSubmitting && <span className="text-xs mt-1">Processing...</span>}
        </button>
      </div>

      {/* Minimal error display */}
      {error && (
        <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-800">
          {error}
        </div>
      )}

      {/* Minimal status messages */}
      {!isWalletReady && (
        <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
          Connecting wallet...
        </div>
      )}

      {IS_GAME_DISABLED && (
        <div className="mt-3 p-2 bg-gray-50 border border-gray-200 rounded text-sm text-gray-800">
          Game is currently disabled
        </div>
      )}
    </div>
  );
}
