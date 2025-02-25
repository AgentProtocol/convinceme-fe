import { Routes, Route, useNavigate } from 'react-router-dom';
import { WebSocketProvider } from './contexts/WebSocketContext';
import LandingPage from "./pages/LandingPage";
import LobbyPage from "./pages/LobbyPage";
import GamePage from "./pages/GamePage";

function App() {
  const navigate = useNavigate();

  const handleEnterGame = () => {
    navigate('/lobby');
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage onEnterGame={handleEnterGame} />} />
      <Route path="/lobby" element={<LobbyPage />} />
      <Route path="/game" element={<GamePage />} />
    </Routes>
  );
}

export default function AppWithProvider() {
  return (
    <WebSocketProvider>
      <App />
    </WebSocketProvider>
  );
}
