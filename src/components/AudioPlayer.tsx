import { useState, useEffect, useRef, useCallback } from 'react';
import websocketService from '../services/websocketService';
import SideAvatar from './SideAvatar';
import messiGif from '../assets/messi.gif';
import ronaldoGif from '../assets/ronaldo.gif';

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
  const audioQueue = useRef<AudioMessage[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentSpeaker, setCurrentSpeaker] = useState<string>(side1);
  const [hitSide, setHitSide] = useState<string | null>(null);
  const currentScore = useRef<Record<string, number>>({});

  const playNextInQueue = useCallback(() => {
    if (
      audioQueue.current.length === 0 ||
      isPlaying ||
      !audioRef.current
    ) {
      return;
    }

    const nextAudio = audioQueue.current[0];
    setIsPlaying(true);

    // Add timestamp to URL to prevent caching
    const url = `${import.meta.env.VITE_API_URL}${nextAudio.audioPath}?t=${Date.now()}`;
    audioRef.current.src = url;
    audioRef.current.load();

    setCurrentSpeaker(nextAudio.agent);

    audioRef.current.oncanplaythrough = () => {
      audioRef.current?.play().catch(error => {
        console.error('Playback error:', error);
        setIsPlaying(false);
        audioQueue.current.shift();
        playNextInQueue();
      });
    };

    audioRef.current.onended = () => {
      setIsPlaying(false);
      audioQueue.current.shift();
      playNextInQueue();
    };

    audioRef.current.onerror = () => {
      console.error('Audio error:', audioRef.current?.error);
      setIsPlaying(false);
      audioQueue.current.shift();
      playNextInQueue();
    };
  }, [isPlaying]);


  useEffect(() => {
    const handleAudioStream = (audioMessage: AudioMessage) => {
      audioQueue.current.push(audioMessage);
      playNextInQueue();
    };

    websocketService.on('audioStream', handleAudioStream);

    return () => {
      websocketService.off('audioStream', handleAudioStream);
    };
  }, [playNextInQueue]);

  useEffect(() => {
    const handleGameScore = (gameScore: Record<string, number>) => {
      if (gameScore[side1] < currentScore.current[side1]) {
        setHitSide(side1);
        setTimeout(() => setHitSide(null), 800);
      }
      if (gameScore[side2] < currentScore.current[side2]) {
        setHitSide(side2);
        setTimeout(() => setHitSide(null), 800);
      }
      currentScore.current = gameScore;
    };

    websocketService.on('game_score', handleGameScore);
    return () => {
      websocketService.off('game_score', handleGameScore);
    };
  }, [side1, side2]);

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex-1 text-center">
        <SideAvatar
          name={side1}
          imageStill={messiGif}
          imageTalking={messiGif}
          color="blue"
          isActive={isPlaying && currentSpeaker === side1}
          isHit={hitSide === side1}
        />
      </div>
      
      <div className="px-8 py-4 flex flex-col items-center">
        <div className="text-2xl font-bold text-gray-800 mb-2">VS</div>
        <div className="flex flex-col items-center">
          <audio ref={audioRef} style={{ display: 'none' }} />
          {/* <div className="text-sm text-gray-600 mb-2">{status}</div> */}
        </div>
      </div>

      <div className="flex-1 text-center">
        <SideAvatar
          name={side2}
          imageStill={ronaldoGif}
          imageTalking={ronaldoGif}
          color="red"
          isActive={isPlaying && currentSpeaker === side2}
          isHit={hitSide === side2}
        />
      </div>
    </div>
  );
}