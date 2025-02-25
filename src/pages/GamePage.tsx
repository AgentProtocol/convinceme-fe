import WelcomeModal from "../components/WelcomeModal";
import GameUI from "../components/GameUI";
import { WebSocketProvider } from "../contexts/WebSocketContext";
import ConvinceMe_logo from '../assets/ConvinceMe_logo.png';
import GamePausedBanner from "../components/GamePausedBanner";
import { IS_GAME_DISABLED } from "../constants";

export default function GamePage() {
  return (
    <WebSocketProvider>
      <div className="h-screen bg-gradient-to-br from-surface-dark to-surface-light flex flex-col overflow-hidden">
        <WelcomeModal />
        {IS_GAME_DISABLED && <GamePausedBanner />}
        <div className="text-center shrink-0 pt-4">
          <img 
            src={ConvinceMe_logo} 
            alt="ConvinceMe Logo" 
            className="h-6 md:h-12 mx-auto mb-4"
          />
        </div>
        <div className="flex-1 min-h-0 px-4 pb-4">
          <GameUI side1="'Fundamentals First' Bradford" side2="'Memecoin Supercycle' Murad" topic="Are memecoins net negative or positive for the crypto space?"/>
        </div>
      </div>
    </WebSocketProvider>
  );
} 