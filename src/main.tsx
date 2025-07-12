import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { PrivyProvider } from '@privy-io/react-auth';
import { Analytics } from '@vercel/analytics/react';

// Debug environment variables
console.log('Privy App ID:', import.meta.env.VITE_PRIVY_APP_ID);

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
      }}
    >
      <App />
      <Analytics />
    </PrivyProvider>
  </BrowserRouter>
);
