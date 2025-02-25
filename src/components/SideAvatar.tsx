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

  // Define the CSS for animations
  const animationStyles = `
    @keyframes grayscale-flash {
      0%, 100% { filter: grayscale(0%); }
      25%, 75% { filter: grayscale(100%) brightness(1.5); }
      50% { filter: grayscale(80%) brightness(0.7); }
    }
    
    @keyframes blood-particle {
      0% { 
        opacity: 0;
        transform: translate(0, 0) scale(0);
      }
      10% {
        opacity: 1;
        transform: translate(0, 0) scale(1);
      }
      100% { 
        opacity: 0;
        transform: translate(var(--tx), var(--ty)) rotate(var(--rot)) scale(0.5);
      }
    }
  `;

  // Determine the direction to move based on the color (side)
  const moveDirection = color === 'blue' ? '-66.7%' : '66.7%';
  
  // Create blood particles with different trajectories
  const bloodParticles = Array(15).fill(0).map((_, i) => {
    // Calculate angle based on side (blue = left, red = right)
    // Spread particles in a 120-degree arc
    const baseAngle = color === 'blue' ? 180 : 0;
    const angle = baseAngle + (Math.random() * 120 - 60);
    
    // Random properties for varied effect
    const distance = 50 + Math.random() * 100;
    const delay = Math.random() * 0.3;
    const duration = 0.7 + Math.random() * 0.6;
    const size = 3 + Math.random() * 8;
    const rotation = Math.random() * 360;
    
    // Calculate trajectory
    const tx = Math.cos(angle * Math.PI / 180) * distance;
    const ty = Math.sin(angle * Math.PI / 180) * distance;
    
    // Determine shape (circle or splatter)
    const isCircle = Math.random() > 0.3;
    const shape = isCircle 
      ? 'rounded-full' 
      : 'clip-path-[polygon(50%_0%,100%_38%,82%_100%,18%_100%,0%_38%)]';
    
    return (
      <div 
        key={i}
        className={`absolute bg-red-600 ${isCircle ? 'rounded-full' : ''}`}
        style={{
          top: '50%',
          left: '50%',
          width: `${size}px`,
          height: `${size}px`,
          opacity: 0,
          zIndex: 10,
          '--tx': `${tx}px`,
          '--ty': `${ty}px`,
          '--rot': `${rotation}deg`,
          animation: isPunched ? `blood-particle ${duration}s ease-out forwards ${delay}s` : 'none',
          clipPath: !isCircle ? 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' : undefined
        } as React.CSSProperties}
      />
    );
  });

  return (
    <div className="relative">
      <style>{animationStyles}</style>
      <div className="flex flex-col items-center">
        <div className={`${baseClasses} overflow-visible relative`}>
          {isPunched && bloodParticles}
          <img
            src={image} 
            className="w-full h-full"
            style={{ 
              animationPlayState: isActive ? 'running' : 'paused',
              transform: isPunched 
                ? `translateX(${moveDirection}) scaleX(-1)` 
                : 'translateX(0)',
              animation: isPunched 
                ? 'grayscale-flash 0.2s linear 10' 
                : 'none',
              transition: isPunched ? 'none' : 'transform 0.3s ease-out'
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