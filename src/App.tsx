import { WebSocketProvider } from './contexts/WebSocketContext';
import WelcomeModal from "./components/WelcomeModal";
import GameUI from "./components/GameUI";

function App() {
  return (
    <div className="h-screen bg-gradient-to-br from-surface-dark to-surface-light flex flex-col overflow-hidden">
      <WelcomeModal />
      <h1 className="text-4xl font-bold text-primary-800 py-6 text-center shrink-0 tracking-tight">
        ConvinceMe
      </h1>
      <div className="flex-1 min-h-0 px-4 pb-4">
        <GameUI side1="Mike 'Grizzly' Johnson" side2="Tony 'The Tiger King' Chen" />
      </div>
    </div>
  );
}

export default function AppWithProvider() {
  return (
    <WebSocketProvider>
      <App />
    </WebSocketProvider>
  );
}
