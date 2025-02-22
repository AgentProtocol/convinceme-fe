import { WebSocketProvider } from './contexts/WebSocketContext';
import WelcomeModal from "./components/WelcomeModal";
import GameUI from "./components/GameUI";

function App() {
  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
      <WelcomeModal />
      <h1 className="text-3xl font-bold text-gray-800 py-4 text-center shrink-0">
        ConvinceMe
      </h1>
      <div className="flex-1 min-h-0">
        <GameUI side1="Bear" side2="Tiger" />
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
