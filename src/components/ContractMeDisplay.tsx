import { useState, useEffect } from 'react';
import {
  useContractMeService,
  ContractInfo,
  escrowUtils,
} from '../services/escrowService';

interface ContractMeDisplayProps {
  onBuyInSuccess?: (txHash: string) => void;
}

export default function ContractMeDisplay({
  onBuyInSuccess,
}: ContractMeDisplayProps) {
  const { createContractMeService, isWalletReady, contractAddress } =
    useContractMeService();
  const [contractInfo, setContractInfo] = useState<ContractInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (isWalletReady) {
      loadContractInfo();
    }
  }, [isWalletReady]);

  const loadContractInfo = async () => {
    try {
      setIsRefreshing(true);
      setError(null);

      const service = await createContractMeService();
      if (!service) {
        throw new Error('Wallet not available');
      }

      const info = await service.getContractInfo();
      setContractInfo(info);
    } catch (err) {
      console.error('Error loading contract info:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to load contract info'
      );
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleBuyIn = async () => {
    if (!contractInfo) {
      setError('Contract info not loaded');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      const service = await createContractMeService();
      if (!service) {
        throw new Error('Wallet not available');
      }

      const txHash = await service.buyIn();
      setSuccess(`Buy-in successful! Transaction: ${txHash}`);

      // Refresh contract info after successful buy-in
      await loadContractInfo();

      // Notify parent component
      onBuyInSuccess?.(txHash);
    } catch (err) {
      console.error('Error buying in:', err);
      setError(err instanceof Error ? err.message : 'Failed to buy in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFundPrizePool = async (amount: string) => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      const service = await createContractMeService();
      if (!service) {
        throw new Error('Wallet not available');
      }

      const txHash = await service.fundPrizePool(amount);
      setSuccess(`Prize pool funded! Transaction: ${txHash}`);

      // Refresh contract info after successful funding
      await loadContractInfo();
    } catch (err) {
      console.error('Error funding prize pool:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to fund prize pool'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isWalletReady) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">
          Wallet not ready. Please connect your wallet first.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">ContractMe Pool</h3>
        <button
          onClick={loadContractInfo}
          disabled={isRefreshing}
          className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
        >
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Contract Info */}
      {contractInfo && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h4 className="font-medium text-blue-900">Current Buy-in Cost</h4>
              <p className="text-2xl font-bold text-blue-800">
                {escrowUtils.formatCHZ(contractInfo.actionCost)}
              </p>
              <p className="text-sm text-blue-600">
                {escrowUtils.formatBuyInNumber(contractInfo.totalBuyIns)}
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <h4 className="font-medium text-green-900">Prize Pool</h4>
              <p className="text-2xl font-bold text-green-800">
                {escrowUtils.formatCHZ(contractInfo.prizePool)}
              </p>
              <p className="text-sm text-green-600">
                Total accumulated rewards
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
              <h4 className="font-medium text-purple-900">Total Buy-ins</h4>
              <p className="text-2xl font-bold text-purple-800">
                {contractInfo.totalBuyIns}
              </p>
              <p className="text-sm text-purple-600">Participants so far</p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <h4 className="font-medium text-gray-900">Base Fee</h4>
              <p className="text-lg font-bold text-gray-800">
                {escrowUtils.formatCHZ(contractInfo.baseFee)}
              </p>
              <p className="text-sm text-gray-600">Starting cost</p>
            </div>
          </div>
        </div>
      )}

      {/* Buy-in Button */}
      <div className="border-t pt-4">
        <button
          onClick={handleBuyIn}
          disabled={isLoading || !contractInfo}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading
            ? 'Processing...'
            : contractInfo
              ? `Buy In for ${escrowUtils.formatCHZ(contractInfo.actionCost)}`
              : 'Loading...'}
        </button>

        <p className="text-sm text-gray-500 mt-2 text-center">
          Buy-in to submit your argument and contribute to the prize pool
        </p>
      </div>

      {/* Fund Prize Pool Section */}
      <div className="border-t pt-4">
        <h4 className="font-medium mb-2">Fund Prize Pool (Optional)</h4>
        <div className="flex gap-2">
          <input
            type="number"
            step="0.01"
            placeholder="Amount in CHZ"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const target = e.target as HTMLInputElement;
                handleFundPrizePool(target.value);
                target.value = '';
              }
            }}
          />
          <button
            onClick={() => {
              const input = document.querySelector(
                'input[placeholder="Amount in CHZ"]'
              ) as HTMLInputElement;
              if (input) {
                handleFundPrizePool(input.value);
                input.value = '';
              }
            }}
            disabled={isLoading}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            Fund
          </button>
        </div>
      </div>

      {/* Contract Address */}
      <div className="border-t pt-4">
        <h4 className="font-medium mb-2">Contract Address</h4>
        <p className="text-sm text-gray-600 font-mono break-all">
          {contractAddress}
        </p>
        <a
          href={`https://spicy-explorer.chiliz.com/address/${contractAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 text-sm underline"
        >
          View on Chilliz Explorer
        </a>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-green-800">{success}</p>
        </div>
      )}
    </div>
  );
}
