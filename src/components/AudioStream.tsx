import { useState, useEffect, useRef } from 'react';
import websocketService from '../services/websocketService';

interface AudioStreamProps {
  volume?: number;
}

const AudioStream: React.FC<AudioStreamProps> = ({ volume = 1.0 }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const isProcessingRef = useRef(false);
  const audioQueueRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (!isPlaying) return;

    audioContextRef.current = new AudioContext();
    gainNodeRef.current = audioContextRef.current.createGain();
    gainNodeRef.current.connect(audioContextRef.current.destination);
    gainNodeRef.current.gain.value = volume;

    const playNextChunk = async () => {
      if (!isPlaying || audioQueueRef.current.length === 0 || isProcessingRef.current) return;

      isProcessingRef.current = true;
      const chunk = audioQueueRef.current.shift()!;
      await new Promise(resolve => setTimeout(resolve, 500));

      try {
        const blob = new Blob([chunk], { type: 'audio/webm; codecs="opus"' });
        const arrayBuffer = await blob.arrayBuffer();
        const audioBuffer = await audioContextRef.current!.decodeAudioData(arrayBuffer);
        
        const sourceNode = audioContextRef.current!.createBufferSource();
        sourceNode.buffer = audioBuffer;
        sourceNode.connect(gainNodeRef.current!);
        
        sourceNode.onended = () => {
          isProcessingRef.current = false;
          playNextChunk();
        };

        sourceNode.start();
      } catch (error) {
        console.error("Error playing audio chunk:", error);
        isProcessingRef.current = false;
        playNextChunk();
      }
    };

    const handleAudioStream = async (audioBlob: Blob) => {
      if (!isPlaying) return;
      audioQueueRef.current.push(audioBlob);
      
      if (!isProcessingRef.current) {
        playNextChunk();
      }
    };

    websocketService.on('audioStream', handleAudioStream);

    return () => {
      websocketService.off('audioStream', handleAudioStream);
      audioContextRef.current?.close();
      audioQueueRef.current = [];
    };
  }, [isPlaying, volume]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col items-center">
      <button 
        onClick={togglePlay}
        className={`w-24 px-6 py-3 rounded-full text-white font-medium transition-colors duration-200 ${
          isPlaying 
            ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/50' 
            : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/50'
        } shadow-lg`}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default AudioStream; 