import { useState, useEffect, useRef } from 'react';

interface AudioStreamProps {
  streamUrl: string;
  autoPlay?: boolean;
  volume?: number;
}

const AudioStream: React.FC<AudioStreamProps> = ({ streamUrl, autoPlay, volume = 1.0 }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current && autoPlay) {
      audioRef.current.play().catch((error) => {
        console.error('Error auto-playing stream:', error);
      });
    }
  }, [autoPlay]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error('Error playing stream:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex justify-center">
      <audio
        ref={audioRef}
        src={streamUrl}
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
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