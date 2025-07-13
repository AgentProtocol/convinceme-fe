import { Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LobbyPage from './pages/LobbyPage';
import DebatePage from './pages/DebatePage';
import TopicSelectionPage from './pages/TopicSelectionPage';

export default function App() {
  const navigate = useNavigate();

  const handleEnterGame = () => {
    navigate('/lobby');
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<LandingPage onEnterGame={handleEnterGame} />}
        />
        <Route path="/lobby" element={<LobbyPage />} />

        <Route path="/debate/:id" element={<DebatePage />} />
        <Route path="/topics" element={<TopicSelectionPage />} />
      </Routes>
    </>
  );
}
