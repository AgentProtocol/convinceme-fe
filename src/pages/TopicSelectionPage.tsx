import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConvinceMe_logo from '../assets/ConvinceMe_logo.png';
import { fetchTopics, createDebate } from '../services/apiService';
import { Topic } from '../types';
import { usePrivy } from '@privy-io/react-auth';
import WalletManager from '../components/WalletManager';
import ContractMeDisplay from '../components/ContractMeDisplay';

export default function TopicSelectionPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreatingDebate, setIsCreatingDebate] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [showContractInfo, setShowContractInfo] = useState(false);
  const navigate = useNavigate();
  const { user } = usePrivy();

  const address = user?.id || user?.email?.address || user?.wallet?.address;

  useEffect(() => {
    const loadTopics = async () => {
      try {
        setIsLoading(true);
        const response = await fetchTopics();
        console.log('response', response);
        setTopics(response.items || []);
      } catch (err) {
        console.error('Failed to load topics:', err);
        setError('Failed to load topics. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadTopics();
  }, []);

  const handleWalletReady = (walletAddr: string) => {
    setWalletAddress(walletAddr);
  };

  const handleBuyInSuccess = (txHash: string) => {
    console.log('Buy-in successful:', txHash);
    // You could add additional logic here, like showing a success message
  };

  const handleCreateDebate = async () => {
    if (!selectedTopic) {
      setError('Please select a topic first.');
      return;
    }

    try {
      console.log('selectedTopic', selectedTopic);
      setIsCreatingDebate(true);
      const response = await createDebate({
        topic_id: selectedTopic,
        created_by: address || undefined,
      });

      // Navigate to the newly created debate
      navigate(`/debate/${response.debate.id}`);
    } catch (err) {
      console.error('Failed to create debate:', err);
      setError('Failed to create debate. Please try again.');
      setIsCreatingDebate(false);
    }
  };

  const filteredTopics = topics.filter((topic) =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading topics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <img
            src={ConvinceMe_logo}
            alt="ConvinceMe"
            className="h-16 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Choose Your Debate Topic
          </h1>
          <p className="text-gray-600">
            Select a topic to start or join a debate
          </p>
        </div>

        {/* Wallet Section */}
        <div className="mb-8">
          <WalletManager onWalletReady={handleWalletReady} />
          {walletAddress && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-blue-900">
                  Ready for ContractMe!
                </h3>
                <button
                  onClick={() => setShowContractInfo(!showContractInfo)}
                  className="text-blue-600 hover:text-blue-800 underline text-sm"
                >
                  {showContractInfo ? 'Hide' : 'View'} Contract Info
                </button>
              </div>
              <p className="text-blue-800 text-sm">
                Your wallet is connected to Chilliz network. You can now
                participate in debates with buy-in functionality to contribute
                to the prize pool.
              </p>
            </div>
          )}
        </div>

        {/* Contract Info */}
        {showContractInfo && walletAddress && (
          <div className="mb-8">
            <ContractMeDisplay onBuyInSuccess={handleBuyInSuccess} />
          </div>
        )}

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredTopics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => setSelectedTopic(topic.id)}
              className={`p-6 bg-white rounded-lg shadow-md cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedTopic === topic.id
                  ? 'border-2 border-blue-500 shadow-lg'
                  : 'border border-gray-200'
              }`}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {topic.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">{topic.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  Category: {topic.category}
                </span>
                <span className="text-xs text-gray-500">
                  {topic.agent1_name} vs {topic.agent2_name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Create Debate Button */}
        {selectedTopic && (
          <div className="text-center">
            <button
              onClick={handleCreateDebate}
              disabled={isCreatingDebate}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isCreatingDebate ? 'Creating Debate...' : 'Create Debate'}
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
