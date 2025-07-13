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
  isHit = false,
}: SideAvatarProps) {
  const baseClasses = "w-24 h-36 md:w-32 md:h-44 lg:w-40 lg:h-52 object-contain rounded-lg mb-2";
  const colorClasses = color === 'blue' ? 'text-blue-700' : 'text-red-700';
  const image = isActive ? imageTalking : imageStill;

  return (
    <div className="relative">
      <div className="flex flex-col items-center">
        {/* Add flash overlay when hit */}
        {isHit && (
          <div className="absolute inset-0 bg-red-500 mix-blend-overlay rounded-lg animate-[flash_0.8s_ease-out]" />
        )}
        <div
          className={`
          ${baseClasses} 
          overflow-hidden 
          relative
          border-2 border-gray-200 shadow-md bg-white p-2
          ${isHit ? 'animate-hit shadow-[0_0_15px_rgba(239,68,68,0.7)]' : ''}
        `}
        >
          <img
            src={image}
            className={`w-full h-3/5 object-contain`}
            style={{
              animationPlayState: isActive ? 'running' : 'paused',
            }}
          />
          <div
            className={`
             text-xs md:text-sm lg:text-base 
             font-bold 
             text-center
             mt-2 px-1
             ${colorClasses}
             ${isHit ? 'animate-[shake_0.8s_ease-in-out]' : ''}
           `}
          >
            {name}
          </div>
        </div>
      </div>
    </div>);
}
