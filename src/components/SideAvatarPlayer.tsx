import { useState, useEffect, useRef, useCallback } from 'react';
import websocketService from '../services/websocketService';
import SideAvatar from './SideAvatar';
import agent1Image from '../assets/agent1.png';
import agent1Gif from '../assets/agent1.gif';
import agent2Image from '../assets/agent2.png';
import agent2Gif from '../assets/agent2.gif';

interface AudioMessage {
  audioPath: string;
  agent: string;
}

interface SideAvatarPlayerProps {
  side: string;
  side1: string;
  side2: string;
}

export default function SideAvatarPlayer({ side, side1, side2 }: SideAvatarPlayerProps) {
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

  const isLeftSide = side === side1;
  const avatarImage = isLeftSide ? agent1Image : agent2Image;
  const avatarGif = isLeftSide ? agent1Gif : agent2Gif;
  const color = isLeftSide ? 'blue' : 'red';

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <audio ref={audioRef} style={{ display: 'none' }} />
      <SideAvatar
        name={side}
        imageStill={avatarImage}
        imageTalking={avatarGif}
        color={color}
        isActive={isPlaying && currentSpeaker === side}
        isHit={hitSide === side}
      />
    </div>
  );
}