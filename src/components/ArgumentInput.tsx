import { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { IS_GAME_DISABLED } from '../constants';

interface ArgumentInputProps {
  onSubmit: (argument: string, side: string) => void;
  disabled?: boolean;
  side1: string;
  side2: string;
}

export default function ArgumentInput({
  onSubmit,
  disabled,
  side1,
  side2,
}: ArgumentInputProps) {
  const [newArgument, setNewArgument] = useState('');
  const { user } = usePrivy();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const address = user?.id || user?.email?.address || user?.wallet?.address;

  const handleSubmit = async (selectedSide: string) => {
    if (!newArgument.trim() || !address || IS_GAME_DISABLED) return;

    try {
      setIsSubmitting(true);

      // Submit the argument directly (no blockchain transactions)
      onSubmit(newArgument, selectedSide);
      setNewArgument('');
    } catch (error) {
      console.error('Error submitting argument:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled =
    disabled ||
    !newArgument.trim() ||
    !address ||
    isSubmitting ||
    IS_GAME_DISABLED;

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <input
          disabled={isSubmitting || IS_GAME_DISABLED}
          type="text"
          value={newArgument}
          onChange={(e) => setNewArgument(e.target.value)}
          placeholder={'Add your argument to the debate...'}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 transition-all placeholder-gray-400 disabled:bg-gray-50"
        />
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => handleSubmit(side1)}
          className="flex-1 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-sm"
          disabled={isDisabled}
        >
          Support {side1}
        </button>
        <button
          onClick={() => handleSubmit(side2)}
          className="flex-1 px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-sm"
          disabled={isDisabled}
        >
          Support {side2}
        </button>
      </div>
    </div>
  );
}
