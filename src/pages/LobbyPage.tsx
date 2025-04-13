import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ConvinceMe_logo from '../assets/ConvinceMe_logo.png';
import { fetchDebates } from '../services/apiService';
import { Debate } from '../types';

import chef1Avatar from '../assets/chef1.svg';
import chef2Avatar from '../assets/chef2.svg';
import scientist1Avatar from '../assets/scientist1.svg';
import scientist2Avatar from '../assets/scientist2.svg';
import environmentalistAvatar from '../assets/environmentalist.svg';
import engineerAvatar from '../assets/engineer.svg';
import agent1Image from '../assets/agent1.png';
import agent2Image from '../assets/agent2.png';

const defaultAvatars = {
  'default1': agent1Image,
  'default2': agent2Image,
  'chef1': chef1Avatar,
  'chef2': chef2Avatar,
  'scientist1': scientist1Avatar,
  'scientist2': scientist2Avatar,
  'environmentalist': environmentalistAvatar,
  'engineer': engineerAvatar
};

// Transformed debate from API to UI model
interface DebateUI extends Debate {
  side1Avatar: string;
  side2Avatar: string;
  // Remove fields that aren't available in the API
}

function getAvatar(key: string): string {
  if (key === "'Fundamentals First' Bradford") {
    return defaultAvatars['default1'];
  }
  if (key === "'Memecoin Supercycle' Murad") {
    return defaultAvatars['default2'];
  }
  const avatarKeys = Object.keys(defaultAvatars);
  const randomIndex = Math.abs(
    key.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % avatarKeys.length
  );
  return defaultAvatars[avatarKeys[randomIndex] as keyof typeof defaultAvatars];
}

function DebatePreview({ debate, isFirst }: { debate: DebateUI, isFirst?: boolean }) {
  const navigate = useNavigate();

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden transition-all ${
        debate.status === 'active' 
          ? `hover:shadow-lg cursor-pointer ${isFirst ? 'ring-2 ring-primary-500 shadow-xl scale-[1.02]' : 'shadow-soft'}` 
          : 'opacity-60 shadow-soft'
      }`}
      onClick={() => debate.status === 'active' && navigate(`/debate/${debate.id}`)}
    >
      {isFirst && (
        <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white text-center text-sm py-1.5 font-medium">
          Featured Debate 🔥
        </div>
      )}
      <div className={`p-4 md:p-6 ${isFirst ? 'bg-gradient-to-b from-white to-primary-50' : ''}`}>
        {/* Top Stats */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className={`w-1.5 h-1.5 rounded-full ${debate.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="mb-6">
          <h2 className={`text-lg md:text-xl font-bold mb-2 ${isFirst ? 'text-primary-800' : 'text-primary-900'}`}>
            {debate.topic}
          </h2>
          <p className="text-sm text-gray-600">
            Join this debate and make your voice heard!
          </p>
        </div>

        {/* Status Area */}
        <div className="text-center mb-4">
          <div className={`text-xl font-bold mb-1 ${isFirst ? 'text-primary-700' : 'text-primary-600'}`}>
            {debate.status === 'waiting' ? 'Waiting for Players' : 
             debate.status === 'active' ? 'Debate in Progress' : 'Debate Ended'}
          </div>
        </div>

        {/* Basic Divider instead of Score Bar */}
        <div className="mb-6 border-t border-gray-200"></div>

        {/* Debaters Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full overflow-hidden mb-2 bg-gray-50 ${isFirst ? 'ring-2 ring-blue-200' : ''}`}>
              <img 
                src={debate.side1Avatar} 
                alt={debate.agent1_name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className={`text-sm font-medium text-center ${debate.status === 'active' ? 'text-blue-700' : 'text-gray-500'}`}>
              {debate.agent1_name}
            </div>
          </div>

          <div className="flex flex-col items-center px-4">
            <div className={`text-2xl font-bold ${isFirst ? 'text-primary-800' : 'text-gray-400'}`}>VS</div>
          </div>

          <div className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full overflow-hidden mb-2 bg-gray-50 ${isFirst ? 'ring-2 ring-red-200' : ''}`}>
              <img 
                src={debate.side2Avatar} 
                alt={debate.agent2_name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className={`text-sm font-medium text-center ${debate.status === 'active' ? 'text-red-700' : 'text-gray-500'}`}>
              {debate.agent2_name}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (debate.status === 'active') navigate(`/debate/${debate.id}`);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              debate.status === 'active' 
                ? `bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:opacity-90 active:opacity-100 ${isFirst ? 'shadow-md' : ''}`
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {debate.status === 'active' ? 'Join Debate' : debate.status === 'waiting' ? 'Coming Soon' : 'Debate Ended'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LobbyPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [debates, setDebates] = useState<DebateUI[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDebates = async () => {
      try {
        setIsLoading(true);
        const response = await fetchDebates();
        // Transform API debates to UI model
        const uiDebates = response.items.map(debate => ({
          ...debate,
          side1Avatar: getAvatar(debate.agent1_name),
          side2Avatar: getAvatar(debate.agent2_name)
          // Remove mock data we don't need
        }));
        
        setDebates(uiDebates);
      } catch (err) {
        console.error('Failed to load debates:', err);
        setError('Failed to load debates. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadDebates();
  }, []);

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
            <p className="text-sm md:text-base text-gray-600 mb-4">
              Choose a debate to join and make your voice heard
            </p>
            
            <button
              onClick={() => navigate('/topics')}
              className="px-6 py-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity mb-6"
            >
              Create New Debate
            </button>
          </header>

          {isLoading ? (
            <div className="text-center py-8">
              <p>Loading debates...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              <p>{error}</p>
            </div>
          ) : debates.length === 0 ? (
            <div className="text-center py-8">
              <p>No debates available at the moment. Start your own debate!</p>
              <button
                onClick={() => navigate('/topics')}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Create New Debate
              </button>
            </div>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {debates.map((debate, index) => (
                <DebatePreview key={debate.id} debate={debate} isFirst={index === 0} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 