import { useState, useEffect, useRef } from 'react';
import websocketService from '../services/websocketService';

interface AudioMessage {
  audioPath: string;
  agent: string;
}

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [status, setStatus] = useState('Idle');
  const audioQueue = useRef<AudioMessage[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleAudioStream = (audioMessage: AudioMessage) => {
      audioQueue.current.push(audioMessage);
      playNextInQueue();
    };

    websocketService.on('audioStream', handleAudioStream);

    return () => {
      websocketService.off('audioStream', handleAudioStream);
    };
  }, []);

  const playNextInQueue = () => {
    if (audioQueue.current.length === 0 || isPlaying || !audioRef.current) {
      return;
    }

    const nextAudio = audioQueue.current[0];
    setIsPlaying(true);
    setStatus(`Loading ${nextAudio.agent}'s response...`);

    // Add timestamp to URL to prevent caching
    const url = `${nextAudio.audioPath}?t=${Date.now()}`;
    audioRef.current.src = url;
    audioRef.current.load();

    audioRef.current.oncanplaythrough = () => {
      setStatus(`Playing ${nextAudio.agent}'s response...`);
      audioRef.current?.play().catch(error => {
        console.error('Playback error:', error);
        setIsPlaying(false);
        audioQueue.current.shift();
        setStatus('Error');
        playNextInQueue();
      });
    };

    audioRef.current.onended = () => {
      setIsPlaying(false);
      audioQueue.current.shift();
      setStatus(audioQueue.current.length > 0 ? 'Loading next response...' : 'Idle');
      playNextInQueue();
    };

    audioRef.current.onerror = () => {
      console.error('Audio error:', audioRef.current?.error);
      setIsPlaying(false);
      audioQueue.current.shift();
      setStatus('Error');
      playNextInQueue();
    };
  };

  return (
    <div className="flex flex-col items-center">
      <audio ref={audioRef} style={{ display: 'none' }} />
      <div className="text-sm text-gray-600 mb-2">{status}</div>
    </div>
  );
} 