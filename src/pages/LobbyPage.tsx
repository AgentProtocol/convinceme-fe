import { useNavigate } from 'react-router-dom';
import PreviewScoreBar from '../components/PreviewScoreBar';
import ConvinceMe_logo from '../assets/ConvinceMe_logo.png';

import chef1Avatar from '../assets/chef1.svg';
import chef2Avatar from '../assets/chef2.svg';
import scientist1Avatar from '../assets/scientist1.svg';
import scientist2Avatar from '../assets/scientist2.svg';
import environmentalistAvatar from '../assets/environmentalist.svg';
import engineerAvatar from '../assets/engineer.svg';
import agent1Image from '../assets/agent1.png';
import agent2Image from '../assets/agent2.png';

interface DebateOption {
  id: string;
  title: string;
  description: string;
  participants: number;
  prizePot: string;
  isActive: boolean;
  side1: string;
  side2: string;
  side1Avatar: string;
  side2Avatar: string;
  timeLeft: string;
  side1Score?: number;
  side2Score?: number;
}

const debates: DebateOption[] = [
  {
    id: 'memecoin-debate',
    title: "Are memecoins net negative or positive for the crypto space?",
    description: "Join the heated debate about the impact of memecoins on the cryptocurrency ecosystem.",
    participants: 24,
    prizePot: "1,250 STRK",
    isActive: true,
    side1: "'Fundamentals First' Bradford",
    side2: "'Memecoin Supercycle' Murad",
    side1Avatar: agent1Image,
    side2Avatar: agent2Image,
    timeLeft: "45:21",
    side1Score: 120,
    side2Score: 80
  },
  {
    id: 'pizza-debate',
    title: "Does Pineapple Belong on Pizza?",
    description: "The age-old culinary debate continues. Take a stand in this controversial gastronomic discussion.",
    participants: 0,
    prizePot: "500 STRK",
    isActive: false,
    side1: "Chef Gordon",
    side2: "Chef Jamie",
    side1Avatar: chef1Avatar,
    side2Avatar: chef2Avatar,
    timeLeft: "Coming Soon",
    side1Score: 0,
    side2Score: 0
  },
  {
    id: 'ai-debate',
    title: "AI: Friend or Foe?",
    description: "Explore the implications of artificial intelligence on society's future.",
    participants: 0,
    prizePot: "750 STRK",
    isActive: false,
    side1: "Dr. Sarah Chen",
    side2: "Prof. James Miller",
    side1Avatar: scientist1Avatar,
    side2Avatar: scientist2Avatar,
    timeLeft: "Coming Soon",
    side1Score: 0,
    side2Score: 0
  },
  {
    id: 'climate-debate',
    title: "Nuclear vs Renewable Energy",
    description: "Which power source should lead our sustainable future?",
    participants: 0,
    prizePot: "1,000 STRK",
    isActive: false,
    side1: "Dr. Emily Green",
    side2: "Dr. Robert Power",
    side1Avatar: environmentalistAvatar,
    side2Avatar: engineerAvatar,
    timeLeft: "Coming Soon",
    side1Score: 0,
    side2Score: 0
  }
];

function DebatePreview({ debate, isFirst }: { debate: DebateOption, isFirst?: boolean }) {
  const navigate = useNavigate();

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden transition-all ${
        debate.isActive 
          ? `hover:shadow-lg cursor-pointer ${isFirst ? 'ring-2 ring-primary-500 shadow-xl scale-[1.02]' : 'shadow-soft'}` 
          : 'opacity-60 shadow-soft'
      }`}
      onClick={() => debate.isActive && navigate('/game')}
    >
      {isFirst && (
        <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white text-center text-sm py-1.5 font-medium">
          Featured Debate 🔥
        </div>
      )}
      <div className={`p-4 md:p-6 ${isFirst ? 'bg-gradient-to-b from-white to-primary-50' : ''}`}>
        {/* Top Stats */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${debate.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></span>
            <span className="text-sm text-gray-600">
              {debate.participants} participants
            </span>
          </div>
          <div className={`text-sm font-medium ${isFirst ? 'text-primary-800' : 'text-primary-700'}`}>
            {debate.timeLeft}
          </div>
        </div>

        {/* Title & Description */}
        <div className="mb-6">
          <h2 className={`text-lg md:text-xl font-bold mb-2 ${isFirst ? 'text-primary-800' : 'text-primary-900'}`}>
            {debate.title}
          </h2>
          <p className="text-sm text-gray-600">
            {debate.description}
          </p>
        </div>

        {/* Prize Pool */}
        <div className="text-center mb-4">
          <div className={`text-3xl font-bold mb-1 ${isFirst ? 'text-primary-700' : 'text-primary-600'}`}>
            {debate.prizePot}
          </div>
        </div>

        {/* Score Bar */}
        <div className="mb-6">
          <PreviewScoreBar
            side1Score={debate.side1Score || 0}
            side2Score={debate.side2Score || 0}
          />
        </div>

        {/* Debaters Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full overflow-hidden mb-2 bg-gray-50 ${isFirst ? 'ring-2 ring-blue-200' : ''}`}>
              <img 
                src={debate.side1Avatar} 
                alt={debate.side1} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className={`text-sm font-medium text-center ${debate.isActive ? 'text-blue-700' : 'text-gray-500'}`}>
              {debate.side1}
            </div>
          </div>

          <div className="flex flex-col items-center px-4">
            <div className={`text-2xl font-bold ${isFirst ? 'text-primary-800' : 'text-gray-400'}`}>VS</div>
          </div>

          <div className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full overflow-hidden mb-2 bg-gray-50 ${isFirst ? 'ring-2 ring-red-200' : ''}`}>
              <img 
                src={debate.side2Avatar} 
                alt={debate.side2} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className={`text-sm font-medium text-center ${debate.isActive ? 'text-red-700' : 'text-gray-500'}`}>
              {debate.side2}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (debate.isActive) navigate('/game');
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              debate.isActive 
                ? `bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:opacity-90 active:opacity-100 ${isFirst ? 'shadow-md' : ''}`
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {debate.isActive ? 'Join Debate' : 'Coming Soon'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LobbyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-dark to-surface-light py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <header className="text-center mb-6 md:mb-8">
            <img 
              src={ConvinceMe_logo} 
              alt="ConvinceMe Logo" 
              className="h-16 md:h-20 mx-auto mb-6"
            />
            <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-2">
              Active Debates
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              Choose a debate to join and make your voice heard
            </p>
          </header>

          <div className="space-y-3 md:space-y-4">
            {debates.map((debate, index) => (
              <DebatePreview key={debate.id} debate={debate} isFirst={index === 0} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 