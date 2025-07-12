import { useState, useEffect } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';

interface WalletManagerProps {
  onWalletReady?: (walletAddress: string) => void;
}

export default function WalletManager({ onWalletReady }: WalletManagerProps) {
  const { authenticated } = usePrivy();
  const { wallets } = useWallets();
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState<string>('0');
  const [error, setError] = useState<string | null>(null);

  // Get the embedded wallet
  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === 'privy'
  );

  useEffect(() => {
    if (embeddedWallet?.address) {
      onWalletReady?.(embeddedWallet.address);
      fetchBalance();
    }
  }, [embeddedWallet?.address, onWalletReady]);

  const fetchBalance = async () => {
    if (!embeddedWallet?.address) return;

    try {
      setIsLoading(true);
      const provider = await embeddedWallet.getEthereumProvider();
      const balance = await provider.request({
        method: 'eth_getBalance',
        params: [embeddedWallet.address, 'latest'],
      });

      // Convert from wei to CHZ
      const balanceInCHZ = parseFloat(balance) / Math.pow(10, 18);
      setBalance(balanceInCHZ.toFixed(4));
    } catch (err) {
      console.error('Error fetching balance:', err);
      setError('Failed to fetch balance');
    } finally {
      setIsLoading(false);
    }
  };

  const switchToChilliz = async () => {
    if (!embeddedWallet) return;

    try {
      setIsLoading(true);
      const provider = await embeddedWallet.getEthereumProvider();

      // Switch to Chilliz Spicy Testnet
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x15B32' }], // 88882 in hex
      });

      await fetchBalance();
    } catch (err: unknown) {
      console.error('Error switching network:', err);

      // If the chain hasn't been added, add it
      const errorWithCode = err as { code?: number };
      if (errorWithCode.code === 4902) {
        try {
          const provider = await embeddedWallet.getEthereumProvider();
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x15B32',
                chainName: 'Chilliz Spicy Testnet',
                nativeCurrency: {
                  name: 'CHZ',
                  symbol: 'CHZ',
                  decimals: 18,
                },
                rpcUrls: ['https://spicy-rpc.chiliz.com'],
                blockExplorerUrls: ['https://spicy-explorer.chiliz.com'],
              },
            ],
          });
        } catch (addError) {
          console.error('Error adding network:', addError);
          setError('Failed to add Chilliz network');
        }
      } else {
        setError('Failed to switch network');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">
          Please log in to access wallet features
        </p>
      </div>
    );
  }

  if (!embeddedWallet) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">Wallet Setup</h3>
        <p className="text-gray-600 mb-4">
          Your wallet is being created automatically. Please wait a moment and
          refresh the page.
        </p>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2">Chilliz Wallet</h3>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <p className="text-sm text-gray-600 font-mono break-all">
            {embeddedWallet.address}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Balance
          </label>
          <p className="text-sm text-gray-600">
            {isLoading ? 'Loading...' : `${balance} CHZ`}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={switchToChilliz}
            disabled={isLoading}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
          >
            Switch to Chilliz
          </button>
          <button
            onClick={fetchBalance}
            disabled={isLoading}
            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
          >
            Refresh Balance
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
}
