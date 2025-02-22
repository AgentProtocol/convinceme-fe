import { useState, useEffect, useRef } from 'react';
import websocketService from '../services/websocketService';
import SideAvatar from './SideAvatar';

interface AudioMessage {
  audioPath: string;
  agent: string;
}

interface AudioPlayerProps {
  side1: string;
  side2: string;
}

export default function AudioPlayer({ side1, side2 }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [status, setStatus] = useState('Idle');
  const audioQueue = useRef<AudioMessage[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentSpeaker, setCurrentSpeaker] = useState<string>(side1);

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
    const url = `${import.meta.env.VITE_API_URL}${nextAudio.audioPath}?t=${Date.now()}`;
    audioRef.current.src = url;
    audioRef.current.load();

    setCurrentSpeaker(nextAudio.agent);

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
    <div className="flex items-center justify-between w-full">
      <div className="flex-1 text-center">
        <SideAvatar
          name={side1}
          color="blue"
          isActive={currentSpeaker === side1}
        />
      </div>
      
      <div className="px-8 py-4 flex flex-col items-center">
        <div className="text-2xl font-bold text-gray-800 mb-2">VS</div>
        <div className="flex flex-col items-center">
          <audio ref={audioRef} style={{ display: 'none' }} />
          <div className="text-sm text-gray-600 mb-2">{status}</div>
        </div>
      </div>

      <div className="flex-1 text-center">
        <SideAvatar
          name={side2}
          color="red"
          isActive={currentSpeaker === side2}
        />
      </div>
    </div>
  );
} 