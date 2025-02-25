import React from 'react';

const GamePausedBanner: React.FC = () => {
  return (
    <div className="bg-yellow-500 text-white text-center py-2 px-4 font-extralight text-sm">
      Game is currently paused.
    </div>
  );
};

export default GamePausedBanner; 