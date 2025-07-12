import { usePrivy } from '@privy-io/react-auth';

export default function DebugPrivy() {
  const { user, authenticated, ready } = usePrivy();

  if (!ready) {
    return (
      <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
        Privy is loading...
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-gray-900 text-white text-xs rounded shadow-lg max-w-sm">
      <h4 className="font-bold mb-2">🔍 Debug Info</h4>
      <div>Ready: {ready ? '✅' : '❌'}</div>
      <div>Authenticated: {authenticated ? '✅' : '❌'}</div>
      <div>App ID: {import.meta.env.VITE_PRIVY_APP_ID?.slice(0, 10)}...</div>
      <div>Mode: {import.meta.env.MODE}</div>
      {user && (
        <div className="mt-2 border-t border-gray-700 pt-2">
          <div className="font-bold">User Info:</div>
          <div>ID: {user.id}</div>
          <div>Email: {user.email?.address || 'N/A'}</div>
          <div>Twitter: {user.twitter?.username || 'N/A'}</div>
          <div>Google: {user.google?.email || 'N/A'}</div>
          <div>Discord: {user.discord?.username || 'N/A'}</div>
          <div>GitHub: {user.github?.username || 'N/A'}</div>
        </div>
      )}
      {!authenticated && (
        <div className="mt-2 border-t border-gray-700 pt-2 text-yellow-400">
          <div>👆 Click "Sign In" to test login</div>
          <div>🐦 Check Twitter debugger (bottom-left)</div>
        </div>
      )}
    </div>
  );
}
