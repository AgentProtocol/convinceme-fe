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
  const image = name.startsWith('M') ? isActive ? bearGif : bearImage : isActive? tigerGif : tigerImage;

  return (
    <div className="relative">
      <div className="flex flex-col items-center">
        <div className={`${baseClasses} overflow-hidden`}>
          <img
            src={image} 
            alt={name}
            className={`w-full h-full`}
            style={{ 
              animationPlayState: isActive ? 'running' : 'paused',
            }}
          />
        </div>
        <div className={`text-lg md:text-xl lg:text-2xl font-bold ${colorClasses}`}>
          {name}
        </div>
      </div>
    </div>
  );
} 