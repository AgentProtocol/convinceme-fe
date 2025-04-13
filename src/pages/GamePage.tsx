import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeModal from "../components/WelcomeModal";
import GameUI from "../components/GameUI";
import { WebSocketProvider } from "../contexts/WebSocketContext";
import ConvinceMe_logo from '../assets/ConvinceMe_logo.png';
import GamePausedBanner from "../components/GamePausedBanner";
import { IS_GAME_DISABLED } from "../constants";

export default function GamePage() {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);

  // This page is now deprecated and should redirect to the lobby
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/lobby');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen bg-gradient-to-br from-surface-dark to-surface-light flex flex-col items-center justify-center">
      <img 
        src={ConvinceMe_logo} 
        alt="ConvinceMe Logo" 
        className="h-12 mb-8"
      />
      <p className="text-center mb-6">
        This page is deprecated. <br />
        Please use the debate-specific pages instead.
      </p>
      <p className="text-center mb-8">
        Redirecting to lobby...
      </p>
      <button 
        onClick={() => navigate('/lobby')} 
        className="px-4 py-2 bg-primary-600 text-white rounded-lg"
      >
        Go to Lobby Now
      </button>
    </div>
  );
} 