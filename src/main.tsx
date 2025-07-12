import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { PrivyProvider } from '@privy-io/react-auth';
import { Analytics } from '@vercel/analytics/react';

// Debug environment variables
console.log('Privy App ID:', import.meta.env.VITE_PRIVY_APP_ID);

// Chilliz Spicy Testnet configuration
const chillizTestnet = {
  id: 88882,
  name: 'Chilliz Spicy Testnet',
  nativeCurrency: {
    name: 'CHZ',
    symbol: 'CHZ',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://spicy-rpc.chiliz.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Chilliz Spicy Explorer',
      url: 'https://spicy-explorer.chiliz.com',
    },
  },
  testnet: true,
};

// Chilliz Mainnet configuration
const chillizMainnet = {
  id: 88888,
  name: 'Chilliz',
  nativeCurrency: {
    name: 'CHZ',
    symbol: 'CHZ',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.ankr.com/chiliz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Chilliz Explorer',
      url: 'https://explorer.chiliz.com',
    },
  },
  testnet: false,
};

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID || 'your-privy-app-id'}
      config={{
        appearance: {
          theme: 'light',
          accentColor: '#3B82F6',
          logo: '/ConvinceMe_logo.png',
          showWalletLoginFirst: false,
          walletList: [], // Hide wallet options to focus on social logins
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
          requireUserPasswordOnCreate: false,
        },
        loginMethods: ['twitter', 'google', 'discord', 'github', 'email'],
        supportedChains: [chillizTestnet, chillizMainnet],
        defaultChain: chillizTestnet,
      }}
    >
      <App />
      <Analytics />
    </PrivyProvider>
  </BrowserRouter>
);
