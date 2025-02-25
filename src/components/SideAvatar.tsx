import { useState, useEffect } from 'react';
import websocketService from "../services/websocketService";

interface SideAvatarProps {
  name: string;
  imageStill: string;
  imageTalking: string;
  color: 'blue' | 'red';
  isActive: boolean;
}

export default function SideAvatar({ name, imageStill, imageTalking, color, isActive }: SideAvatarProps) {
  const [isPunched, setIsPunched] = useState(false);
  const baseClasses = "w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 object-cover rounded-full mb-2";
  const colorClasses = color === 'blue' ? 'text-blue-700' : 'text-red-700';
  const image = isActive ? imageTalking : imageStill;

  useEffect(() => {
    const handleAvatarPunch = (data: { side: string }) => {
      // Check if this avatar should be punched
      if (data.side === name) {
        setIsPunched(true);
        
        // Reset after 2 seconds
        setTimeout(() => {
          setIsPunched(false);
        }, 2000);
      }
    };

    websocketService.on('avatar_punch', handleAvatarPunch);

    return () => {
      websocketService.off('avatar_punch', handleAvatarPunch);
    };
  }, [name]);

  return (
    <div className="relative">
      <div className="flex flex-col items-center">
        <div className={`${baseClasses} overflow-hidden`}>
          <img
            src={image} 
            className={`w-full h-full ${isPunched ? 'scale-x-[-1]' : ''}`}
            style={{ 
              animationPlayState: isActive ? 'running' : 'paused',
            }}
          />
        </div>
        <div className={`text-base md:text-lg lg:text-xl font-bold ${colorClasses}`}>
          {name}
        </div>
      </div>
    </div>
  );
} 