interface SideAvatarProps {
  name: string;
  imageStill: string;
  imageTalking: string;
  color: 'blue' | 'red';
  isActive: boolean;
}

export default function SideAvatar({ name, imageStill, imageTalking, color, isActive }: SideAvatarProps) {
  const baseClasses = "w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover rounded-full mb-2";
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
        <div className={`text-lg md:text-xl lg:text-2xl font-bold ${colorClasses}`}>
          {name}
        </div>
      </div>
    </div>
  );
} 