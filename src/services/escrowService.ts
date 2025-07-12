import { useWallets } from '@privy-io/react-auth';
import { ethers, Contract, providers } from 'ethers';

// ContractMe ABI based on the deployed contract
const CONTRACT_ME_ABI = [
  {
    inputs: [],
    name: 'actionCost',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'buyIn',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'fundPrizePool',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'prizePoolAmount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalBuyIns',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'baseFee',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'buyInCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'prizePool',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'payout',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'cost',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'buyInNumber',
        type: 'uint256',
      },
    ],
    name: 'BuyIn',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'funder',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'PrizeFunded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Payout',
    type: 'event',
  },
];

// Your deployed contract address on Chilliz Spicy Testnet
const CONTRACT_ME_ADDRESS = '0x3cFcddEd8A7cFeb0e337BdbD8aE97bC88C283a3A';

export interface ContractInfo {
  actionCost: string;
  prizePool: string;
  totalBuyIns: number;
  baseFee: string;
  owner: string;
}

// Interface for the wallet provider
interface WalletProvider {
  getEthereumProvider(): Promise<providers.ExternalProvider>;
  address: string;
}

export class ContractMeService {
  private provider: providers.ExternalProvider | null = null;
  private wallet: WalletProvider;

  constructor(wallet: WalletProvider) {
    this.wallet = wallet;
  }

  async init(): Promise<void> {
    this.provider = await this.wallet.getEthereumProvider();
  }

  /**
   * Get current action cost (what user needs to pay to buy in)
   */
  async getActionCost(): Promise<string> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    const contract = this.getContract();

    try {
      const cost = await contract.actionCost();
      return ethers.utils.formatEther(cost);
    } catch (error) {
      console.error('Error getting action cost:', error);
      throw error;
    }
  }

  /**
   * Get current prize pool amount
   */
  async getPrizePoolAmount(): Promise<string> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    const contract = this.getContract();

    try {
      const amount = await contract.prizePoolAmount();
      return ethers.utils.formatEther(amount);
    } catch (error) {
      console.error('Error getting prize pool amount:', error);
      throw error;
    }
  }

  /**
   * Get total number of buy-ins
   */
  async getTotalBuyIns(): Promise<number> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    const contract = this.getContract();

    try {
      const total = await contract.totalBuyIns();
      return total.toNumber();
    } catch (error) {
      console.error('Error getting total buy-ins:', error);
      throw error;
    }
  }

  /**
   * Get base fee
   */
  async getBaseFee(): Promise<string> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    const contract = this.getContract();

    try {
      const fee = await contract.baseFee();
      return ethers.utils.formatEther(fee);
    } catch (error) {
      console.error('Error getting base fee:', error);
      throw error;
    }
  }

  /**
   * Get contract owner
   */
  async getOwner(): Promise<string> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    const contract = this.getContract();

    try {
      return await contract.owner();
    } catch (error) {
      console.error('Error getting owner:', error);
      throw error;
    }
  }

  /**
   * Get wallet balance (CHZ balance)
   */
  async getWalletBalance(): Promise<string> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    try {
      const provider = new providers.Web3Provider(this.provider);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
      return ethers.utils.formatEther(balance);
    } catch (error) {
      console.error('Error getting wallet balance:', error);
      throw error;
    }
  }

  /**
   * Get wallet address
   */
  async getWalletAddress(): Promise<string> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    try {
      const provider = new providers.Web3Provider(this.provider);
      const signer = provider.getSigner();
      return await signer.getAddress();
    } catch (error) {
      console.error('Error getting wallet address:', error);
      throw error;
    }
  }

  /**
   * Get all contract information at once
   */
  async getContractInfo(): Promise<ContractInfo> {
    const [actionCost, prizePool, totalBuyIns, baseFee, owner] =
      await Promise.all([
        this.getActionCost(),
        this.getPrizePoolAmount(),
        this.getTotalBuyIns(),
        this.getBaseFee(),
        this.getOwner(),
      ]);

    return {
      actionCost,
      prizePool,
      totalBuyIns,
      baseFee,
      owner,
    };
  }

  /**
   * Buy in to the contract (user submits comment and pays)
   */
  async buyIn(): Promise<string> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    const contract = this.getContract();

    try {
      // Get current cost
      const cost = await contract.actionCost();

      // Execute buy-in transaction
      const tx = await contract.buyIn({
        value: cost,
        gasLimit: 100000, // Set reasonable gas limit
      });

      await tx.wait();
      return tx.hash;
    } catch (error) {
      console.error('Error buying in:', error);
      throw error;
    }
  }

  /**
   * Fund the prize pool directly
   */
  async fundPrizePool(amount: string): Promise<string> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    const contract = this.getContract();

    try {
      const amountInWei = ethers.utils.parseEther(amount);

      const tx = await contract.fundPrizePool({
        value: amountInWei,
        gasLimit: 100000,
      });

      await tx.wait();
      return tx.hash;
    } catch (error) {
      console.error('Error funding prize pool:', error);
      throw error;
    }
  }

  /**
   * Get contract instance
   */
  private getContract(): Contract {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    const provider = new providers.Web3Provider(this.provider);
    const signer = provider.getSigner();
    return new Contract(CONTRACT_ME_ADDRESS, CONTRACT_ME_ABI, signer);
  }
}

/**
 * Hook to use ContractMe service
 */
export const useContractMeService = () => {
  const { wallets } = useWallets();
  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === 'privy'
  );

  const createContractMeService =
    async (): Promise<ContractMeService | null> => {
      if (!embeddedWallet) {
        return null;
      }

      const service = new ContractMeService(embeddedWallet as WalletProvider);
      await service.init();
      return service;
    };

  return {
    createContractMeService,
    isWalletReady: !!embeddedWallet,
    contractAddress: CONTRACT_ME_ADDRESS,
  };
};

// Legacy exports for backward compatibility
export { ContractMeService as EscrowService };
export type { ContractInfo as EscrowData };
export const useEscrowService = useContractMeService;
export const escrowUtils = {
  formatCHZ: (amount: string): string => {
    return `${parseFloat(amount).toFixed(4)} CHZ`;
  },

  formatBuyInNumber: (buyIns: number): string => {
    return `Buy-in #${buyIns + 1}`;
  },

  calculateNextCost: (baseFee: string, buyIns: number): string => {
    const base = parseFloat(baseFee);
    const logValue = Math.floor(Math.log2(buyIns + 2)); // +2 for next buy-in
    const multiplier = 1 + logValue;
    return (base * multiplier).toFixed(4);
  },
};
