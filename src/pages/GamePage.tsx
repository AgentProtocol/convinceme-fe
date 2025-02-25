import WelcomeModal from "../components/WelcomeModal";
import GameUI from "../components/GameUI";
import { WebSocketProvider } from "../contexts/WebSocketContext";
export default function GamePage() {
  return (

    <WebSocketProvider>
      <div className="h-screen bg-gradient-to-br from-surface-dark to-surface-light flex flex-col overflow-hidden">
        <WelcomeModal />
        <h1 className="text-2xl font-bold text-primary-800 py-4 text-center shrink-0 tracking-tight">
          ConvinceMe
        </h1>
        <div className="flex-1 min-h-0 px-4 pb-4">
          <GameUI side1="Mike 'Grizzly' Johnson" side2="Tony 'The Tiger King' Chen" />
        </div>
      </div>
    </WebSocketProvider>
  );
} 