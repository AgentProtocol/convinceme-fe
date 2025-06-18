import { useState, useEffect } from "react";
import websocketService from '../services/websocketService';
import ArgumentScoreDisplay from './ArgumentScoreDisplay';

export interface Transcript {
  id: number;
  transcript: string;
  username: string;
  createdAt: Date;
  isPlayer?: boolean;
  scores?: {
    argument?: {
      strength: number;
      relevance: number;
      logic: number;
      truth: number;
      humor: number;
      average: number;
      explanation?: string;
    };
  };
}

export default function TranscriptList() {
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);

  useEffect(() => {
    const handleNewTranscript = (newTranscript: Transcript) => {
      setTranscripts(prev => [...prev, newTranscript]);
    };

    // Subscribe to transcript events
    websocketService.on('transcript', handleNewTranscript);

    return () => {
      // Cleanup subscription
      websocketService.off('transcript', handleNewTranscript);
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto mb-4">
      <div className="max-h-[30vh] min-h-[30vh] overflow-y-auto flex flex-col-reverse">
        {[...transcripts].reverse().map((transcript) => (
          <div key={transcript.id} className="p-4 text-center">
            <div className="mb-2 font-semibold text-gray-700">
              {transcript.username}
              {transcript.isPlayer && (
                <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Player
                </span>
              )}
            </div>
            <p className="text-gray-800 mb-3">
              {transcript.transcript}
            </p>
            {transcript.scores?.argument && (
              <ArgumentScoreDisplay 
                score={transcript.scores.argument} 
                className="max-w-md mx-auto"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}