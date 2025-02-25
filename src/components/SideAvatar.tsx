interface SideAvatarProps {
  name: string;
  imageStill: string;
  imageTalking: string;
  color: 'blue' | 'red';
  isActive: boolean;
}

export default function SideAvatar({ name, imageStill, imageTalking, color, isActive }: SideAvatarProps) {
  const baseClasses = "w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 object-cover rounded-full mb-2";
  const colorClasses = color === 'blue' ? 'text-blue-700' : 'text-red-700';
  const image = isActive ? imageTalking : imageStill;

  return (
    <div className="relative">
      <div className="flex flex-col items-center">
        <div className={`${baseClasses} overflow-hidden`}>
          <img
            src={image} 
            className={`w-full h-full`}
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