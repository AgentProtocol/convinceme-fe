import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConvinceMe_logo from '../assets/ConvinceMe_logo.png';
import { fetchTopics, createDebate } from '../services/apiService';
import { Topic } from '../types';
import { useAccount } from '@starknet-react/core';

export default function TopicSelectionPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreatingDebate, setIsCreatingDebate] = useState(false);
  const navigate = useNavigate();
  const { address } = useAccount();

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
        created_by: address || undefined
      });

      // Navigate to the newly created debate
      navigate(`/debate/${response.debate.id}`);
    } catch (err) {
      console.error('Failed to create debate:', err);
      setError('Failed to create debate. Please try again.');
      setIsCreatingDebate(false);
    }
  };

  const filteredTopics = topics.filter(topic => 
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              Select a Debate Topic
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-6">
              Choose a topic to start a new debate
            </p>

            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search topics..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                onClick={() => setSearchTerm('')}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${!searchTerm && 'hidden'}`}
              >
                ✕
              </button>
            </div>
          </header>

          {isLoading ? (
            <div className="text-center py-8">
              <p>Loading topics...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              <p>{error}</p>
            </div>
          ) : filteredTopics.length === 0 ? (
            <div className="text-center py-8">
              <p>No topics match your search. Try different keywords.</p>
            </div>
          ) : (
            <>
              <div className="space-y-3 md:space-y-4 mb-8">
                {filteredTopics.map(topic => (
                  <div
                    key={topic.id}
                    className={`bg-white rounded-2xl p-4 md:p-6 overflow-hidden transition-all cursor-pointer ${
                      selectedTopic === topic.id 
                        ? 'ring-2 ring-primary-500 shadow-xl' 
                        : 'shadow-soft hover:shadow-lg'
                    }`}
                    onClick={() => setSelectedTopic(topic.id)}
                  >
                    <div className="flex items-center mb-2">
                      <span className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        selectedTopic === topic.id
                          ? 'bg-primary-500 border-primary-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedTopic === topic.id && (
                          <span className="flex items-center justify-center h-full text-white text-xs">✓</span>
                        )}
                      </span>
                      <h3 className="text-lg font-bold">{topic.title}</h3>
                    </div>

                    <p className="text-sm text-gray-600 ml-7 mb-4">
                      {topic.description}
                    </p>

                    <div className="flex items-center justify-between ml-7">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500">Category: </span>
                        <span className="ml-1 text-sm font-medium text-primary-700">{topic.category}</span>
                      </div>
                      <div className="flex">
                        <div className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-700">
                          {topic.agent1_name} vs {topic.agent2_name}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleCreateDebate}
                  disabled={!selectedTopic || isCreatingDebate}
                  className={`px-6 py-3 rounded-lg text-white font-medium transition-all ${
                    selectedTopic && !isCreatingDebate
                      ? 'bg-gradient-to-r from-primary-600 to-primary-500 hover:opacity-90'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  {isCreatingDebate ? 'Creating Debate...' : 'Start Debate'}
                </button>
              </div>
            </>
          )}

          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/lobby')}
              className="text-primary-600 hover:text-primary-800 font-medium"
            >
              Return to Lobby
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 