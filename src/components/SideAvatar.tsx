import bearGif from '../assets/beargif.gif';
import tigerGif from '../assets/tigergif.gif';
import bearImage from '../assets/bear.png';
import tigerImage from '../assets/tiger.png';

interface SideAvatarProps {
  emoji?: string; // optional now since we're using images
  name: string;
  color: 'blue' | 'red';
  isActive: boolean;
}

export default function SideAvatar({ name, color, isActive }: SideAvatarProps) {
  const baseClasses = "w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover rounded-full mb-2";
  const colorClasses = color === 'blue' ? 'text-blue-700' : 'text-red-700';
  const image = name === "Bear" ? isActive ? bearGif : bearImage : isActive? tigerGif : tigerImage;

  return (
    <div className="relative">
      <div className="flex flex-col items-center">
        <div className={`${baseClasses} overflow-hidden`}>
          <img
            src={image} 
            alt={name}
            className={`w-full h-full ${isActive ? 'animate-play' : 'animate-none'}`}
            style={{ 
              animationPlayState: isActive ? 'running' : 'paused',
            }}
          />
        </div>
        <div className={`text-lg md:text-xl lg:text-2xl font-bold ${colorClasses}`}>
          {name}
        </div>
      </div>
      {isActive && (
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-1 md:gap-1.5">
            <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-current rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
            <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-current rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
            <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-current rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      )}
    </div>
  );
} 