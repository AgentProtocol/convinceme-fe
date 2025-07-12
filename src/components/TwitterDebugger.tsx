import { usePrivy } from '@privy-io/react-auth';
import { useState } from 'react';

export default function TwitterDebugger() {
  const { login, user, ready } = usePrivy();
  const [debugVisible, setDebugVisible] = useState(false);

  const handleTwitterLogin = async () => {
    try {
      console.log('🐦 Attempting Twitter login...');
      await login();
    } catch (error) {
      console.error('❌ Twitter login failed:', error);
    }
  };

  const checkConfiguration = () => {
    console.log('🔍 Configuration Debug:');
    console.log('- Privy App ID:', import.meta.env.VITE_PRIVY_APP_ID);
    console.log('- Environment:', import.meta.env.MODE);
    console.log('- Current URL:', window.location.href);
    console.log('- User Agent:', navigator.userAgent);
    console.log('- Privy Ready:', ready);
    console.log('- Current User:', user);
  };

  const testOAuthFlow = () => {
    console.log('🔗 Testing OAuth Flow...');

    // Simulate the OAuth URL that should be generated
    const oauthParams = {
      client_id: 'YOUR_TWITTER_CLIENT_ID',
      redirect_uri: 'https://auth.privy.io/api/v1/oauth/callback',
      response_type: 'code',
      scope: 'users.read tweet.read',
      state: 'test-state',
      code_challenge: 'test-challenge',
      code_challenge_method: 'S256',
    };

    console.log('Expected OAuth URL parameters:', oauthParams);
    console.log(
      "🚨 If your Twitter app doesn't match these exactly, you'll get a 400 error"
    );
  };

  if (!debugVisible) {
    return (
      <button
        onClick={() => setDebugVisible(true)}
        className="fixed bottom-4 left-4 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
      >
        🐦 Debug Twitter
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 bg-gray-900 text-white text-xs rounded shadow-lg p-4 max-w-md">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-bold">🐦 Twitter OAuth Debug</h4>
        <button
          onClick={() => setDebugVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="space-y-2 mb-3">
        <div>Ready: {ready ? '✅' : '❌'}</div>
        <div>User: {user ? '✅ Logged in' : '❌ Not logged in'}</div>
        <div>
          App ID: {import.meta.env.VITE_PRIVY_APP_ID ? '✅ Set' : '❌ Missing'}
        </div>
      </div>

      <div className="space-y-2">
        <button
          onClick={handleTwitterLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
        >
          🐦 Test Twitter Login
        </button>

        <button
          onClick={checkConfiguration}
          className="w-full bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
        >
          🔍 Check Config
        </button>

        <button
          onClick={testOAuthFlow}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm"
        >
          🔗 Test OAuth Flow
        </button>
      </div>

      <div className="mt-3 text-xs text-gray-400">
        <p>Check console for detailed logs</p>
        <p>If you get 400 errors, check the troubleshooting guide</p>
      </div>
    </div>
  );
}
