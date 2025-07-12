import { useState, useEffect } from 'react';
import { useContractMeService, escrowUtils } from '../services/escrowService';

interface WalletInfoProps {
  className?: string;
}

export default function WalletInfo({ className = '' }: WalletInfoProps) {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [walletBalance, setWalletBalance] = useState<string>('0');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const { createContractMeService, isWalletReady } = useContractMeService();

  const fetchWalletInfo = async () => {
    try {
      setError(null);
      const service = await createContractMeService();
      if (!service) {
        setError('Wallet service not available');
        return;
      }

      const [address, balance] = await Promise.all([
        service.getWalletAddress(),
        service.getWalletBalance(),
      ]);

      setWalletAddress(address);
      setWalletBalance(balance);
    } catch (err) {
      console.error('Error fetching wallet info:', err);
      setError('Failed to load wallet info');
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
    fetchWalletInfo();

    // Set up polling every 30 seconds for balance updates
    const interval = setInterval(() => {
      fetchWalletInfo();
    }, 30000);

    return () => clearInterval(interval);
  }, [isWalletReady]);

  const truncateAddress = (address: string): string => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyToClipboard = async () => {
    if (!walletAddress) return;

    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopySuccess(true);
      // Reset success state after 2 seconds
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy wallet address:', err);
    }
  };

  if (!isWalletReady || error) {
    return null; // Don't show if wallet not ready or error
  }

  if (isLoading) {
    return (
      <div className={className}>
        <div style={{ fontSize: 10, color: '#6b7280', textAlign: 'center' }}>
          Loading wallet...
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div
        style={{
          fontSize: 10,
          color: '#6b7280',
          textAlign: 'center',
          marginTop: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
        }}
      >
        <span>{truncateAddress(walletAddress)}</span>
        <button
          onClick={copyToClipboard}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 2,
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            color: copySuccess ? '#059669' : '#6b7280',
            fontSize: 10,
          }}
          title={copySuccess ? 'Copied!' : 'Copy wallet address'}
        >
          {copySuccess ? '✓' : '📋'}
        </button>
      </div>
      <div
        style={{
          fontSize: 10,
          color: '#059669',
          textAlign: 'center',
          fontWeight: 600,
        }}
      >
        {escrowUtils.formatCHZ(walletBalance)}
      </div>
    </div>
  );
}
