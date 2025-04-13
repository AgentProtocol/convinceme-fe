import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import WelcomeModal from "../components/WelcomeModal";
import GameUI from "../components/GameUI";
import { WebSocketProvider } from "../contexts/WebSocketContext";
import ConvinceMe_logo from '../assets/ConvinceMe_logo.png';
import GamePausedBanner from "../components/GamePausedBanner";
import { IS_GAME_DISABLED } from "../constants";
import { fetchDebateById } from "../services/apiService";
import { Debate } from "../types";

export default function DebatePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [debate, setDebate] = useState<Debate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (!id) {
    navigate('/lobby');
    return;
  }

  useEffect(() => {
    const loadDebate = async () => {

      try {
        setLoading(true);
        const response = await fetchDebateById(id);
        
        setDebate(response.debate);
      } catch (err) {
        console.error('Failed to load debate:', err);
        setError('Failed to load the debate. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadDebate();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-br from-surface-dark to-surface-light flex flex-col items-center justify-center">
        <img 
          src={ConvinceMe_logo} 
          alt="ConvinceMe Logo" 
          className="h-12 mb-8"
        />
        <p>Loading debate...</p>
      </div>
    );
  }

  if (error || !debate) {
    return (
      <div className="h-screen bg-gradient-to-br from-surface-dark to-surface-light flex flex-col items-center justify-center">
        <img 
          src={ConvinceMe_logo} 
          alt="ConvinceMe Logo" 
          className="h-12 mb-8"
        />
        <p className="text-red-500 mb-4">{error || 'Debate not found'}</p>
        <button 
          onClick={() => navigate('/lobby')} 
          className="px-4 py-2 bg-primary-600 text-white rounded-lg"
        >
          Return to Lobby
        </button>
      </div>
    );
  }

  return (
    <WebSocketProvider debateId={id}>
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
          <GameUI 
            side1={debate.agent1_name} 
            side2={debate.agent2_name} 
            topic={debate.topic}
            debateId={debate.id}
          />
        </div>
      </div>
    </WebSocketProvider>
  );
} 