interface SideAvatarProps {
  name: string;
  imageStill: string;
  imageTalking: string;
  color: 'blue' | 'red';
  isActive: boolean;
  isHit?: boolean;
}

export default function SideAvatar({ 
  name, 
  imageStill, 
  imageTalking, 
  color, 
  isActive,
  isHit = false 
}: SideAvatarProps) {
  const baseClasses = "w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 object-cover rounded-full mb-2";
  const colorClasses = color === 'blue' ? 'text-blue-700' : 'text-red-700';
  const image = isActive ? imageTalking : imageStill;

  return (
    <div className="relative">
      <div className="flex flex-col items-center">
        {/* Add flash overlay when hit */}
        {isHit && (
          <div className="absolute inset-0 bg-red-500 mix-blend-overlay rounded-full animate-[flash_0.8s_ease-out]" />
        )}
        <div className={`
          ${baseClasses} 
          overflow-hidden 
          relative
          ${isHit ? 'animate-hit shadow-[0_0_15px_rgba(239,68,68,0.7)]' : ''}
        `}>
          <img
            src={image} 
            className={`w-full h-full`}
            style={{ 
              animationPlayState: isActive ? 'running' : 'paused',
            }}
          />
        </div>
        <div className={`
          text-base md:text-lg lg:text-xl 
          font-bold 
          ${colorClasses}
          ${isHit ? 'animate-[shake_0.8s_ease-in-out]' : ''}
        `}>
          {name}
        </div>
      </div>
    </div>
  );
} 