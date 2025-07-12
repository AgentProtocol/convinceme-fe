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
  const [success, setSuccess] = useState<string | null>(null);

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
    setSuccess(null);

    try {
      // First, perform the buy-in
      const service = await createContractMeService();
      if (!service) {
        throw new Error('Wallet service not available');
      }

      const txHash = await service.buyIn();
      setSuccess(`Buy-in successful! Transaction: ${txHash}`);

      // Then submit the argument to the debate system
      onSubmit(newArgument, selectedSide);
      setNewArgument('');

      // Refresh the cost for next argument
      await loadCurrentCost();

      // Clear success message after a delay
      setTimeout(() => setSuccess(null), 5000);
    } catch (err) {
      console.error('Error submitting argument:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to submit argument'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Separate disabled states for input vs buttons
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
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Submit Your Argument</h3>

      {/* Buy-in Cost Display */}
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-blue-900">
            Current Buy-in Cost:
          </span>
          <span className="text-lg font-bold text-blue-800">
            {isLoadingCost ? 'Loading...' : escrowUtils.formatCHZ(currentCost)}
          </span>
        </div>
        <p className="text-xs text-blue-600 mt-1">
          This amount will be deducted from your wallet when you submit your
          argument
        </p>
      </div>

      {/* Argument Input */}
      <div className="mb-4">
        <textarea
          value={newArgument}
          onChange={(e) => setNewArgument(e.target.value)}
          placeholder="Enter your argument here..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={4}
          disabled={isInputDisabled}
        />
      </div>

      {/* Character count */}
      <div className="mb-4 text-right">
        <span className="text-sm text-gray-500">
          {newArgument.length} characters
        </span>
      </div>

      {/* Side Selection Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleSubmit(side1)}
          disabled={isButtonDisabled}
          className="flex flex-col items-center justify-center p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

      {/* Status Messages */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-sm">{success}</p>
        </div>
      )}

      {/* Wallet Status */}
      {!isWalletReady && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm">
            Please connect your wallet to submit arguments
          </p>
        </div>
      )}

      {/* Game Status */}
      {IS_GAME_DISABLED && (
        <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-gray-800 text-sm">Game is currently disabled</p>
        </div>
      )}
    </div>
  );
}
