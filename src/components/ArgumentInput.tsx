import { useState } from 'react';
import { useAccount, useCall, useSendTransaction } from '@starknet-react/core';
import { CONTRACT_ADDRESS, STRK_ADDRESS, CONTRACT_ABI, formatTokenAmount } from '../contracts';

interface ArgumentInputProps {
  onSubmit: (argument: string, side: string) => void;
  disabled?: boolean;
  side1: string;
  side2: string;
}

export default function ArgumentInput({ onSubmit, disabled, side1, side2 }: ArgumentInputProps) {
  const [newArgument, setNewArgument] = useState('');
  const { address } = useAccount();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Read the current action cost
  const { refetch: refetchActionCost, data: actionCostResult } = useCall({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'action_cost',
    args: [],
    watch: true,
    refetchInterval: 5000
  });

  // Setup transaction sender
  const { sendAsync: sendTransaction } = useSendTransaction({
    calls: []
  });

  const handleSubmit = async (selectedSide: string) => {
    if (!newArgument.trim() || !address) return;
    
    try {
      setIsSubmitting(true);

      const { data: actionCost } = await refetchActionCost();
      if (!actionCost) {
        throw new Error('Failed to fetch action cost');
      }

      // Prepare transaction calls
      const calls = [
        {
          contractAddress: STRK_ADDRESS,
          entrypoint: 'approve',
          calldata: [CONTRACT_ADDRESS, actionCost.toString(), "0"]
        },
        {
          contractAddress: CONTRACT_ADDRESS,
          entrypoint: 'buyin',
          calldata: []
        }
      ];

      // Send transactions
      const result = await sendTransaction(calls);
      if (!result.transaction_hash) {
        throw new Error('Transaction failed');
      }

      // If transactions succeed, submit the argument
      onSubmit(newArgument, selectedSide);
      setNewArgument('');
    } catch (error) {
      console.error('Error submitting argument:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = disabled || !newArgument.trim() || !address || isSubmitting;
  const buyInAmount = actionCostResult ? formatTokenAmount(BigInt(actionCostResult.toString())) : null;
  const buyInText = buyInAmount ? `${buyInAmount} STRK` : '';

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <input
          disabled={isSubmitting}
          type="text"
          value={newArgument}
          onChange={(e) => setNewArgument(e.target.value)}
          placeholder={"Add your argument to the debate..."}
          className={`w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 transition-all placeholder-gray-400 disabled:bg-gray-50 ${buyInText ? 'pr-[120px]' : ''}`}
        />
        {buyInAmount ? (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 bg-white px-1">
            {buyInText}
          </div>
        ) : (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="h-4 w-16 bg-gray-200 animate-pulse rounded" />
          </div>
        )}
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => handleSubmit(side1)}
          className="flex-1 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-sm"
          disabled={isDisabled}
        >
          Support {side1}
        </button>
        <button
          onClick={() => handleSubmit(side2)}
          className="flex-1 px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-sm"
          disabled={isDisabled}
        >
          Support {side2}
        </button>
      </div>
    </div>
  );
} 