import { useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface AudioStreamProps {
  streamUrl: string;
  volume?: number;
}

const AudioStream: React.FC<AudioStreamProps> = ({ streamUrl, volume = 1.0 }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [status, setStatus] = useState('Idle');
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  const initializeHLS = () => {
    if (!audioPlayerRef.current || !isEnabled) return;

    setStatus('Loading stream...');

    // Native HLS support in Safari
    if (audioPlayerRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      audioPlayerRef.current.src = streamUrl;
      audioPlayerRef.current.volume = volume;
      audioPlayerRef.current.play().catch(error => {
        console.error('Native HLS playback error:', error);
        setStatus('Playback error');
      });
    }
    // Use HLS.js for other browsers
    else if (Hls.isSupported()) {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }

      const hls = new Hls();
      hlsRef.current = hls;
      hls.loadSource(streamUrl);
      hls.attachMedia(audioPlayerRef.current);
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        audioPlayerRef.current!.volume = volume;
        audioPlayerRef.current!.play().catch(error => {
          console.error('HLS.js playback error:', error);
          setStatus('Playback error');
        });
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS.js error:', data);
        if (data.fatal) {
          setStatus('Stream error');
        }
      });
    }
  };

  useEffect(() => {
    if (isEnabled) {
      initializeHLS();
    } else {
      // Stop playback when disabled
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        setStatus('Idle');
      }
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    }
  }, [isEnabled, streamUrl, volume]);

  // Clean up HLS instance on unmount
  useEffect(() => {
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, []);

  const toggleAudioStream = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <div className="flex flex-col items-center">
      <audio ref={audioPlayerRef} style={{ display: 'none' }} />
      <div className="text-sm text-gray-600 mb-2">{status}</div>
      <button 
        onClick={toggleAudioStream}
        className={`w-24 px-6 py-3 rounded-full text-white font-medium transition-colors duration-200 ${
          isEnabled 
            ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/50' 
            : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/50'
        } shadow-lg`}
      >
        {isEnabled ? 'Stop' : 'Play'}
      </button>
    </div>
  );
};

export default AudioStream;