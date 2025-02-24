import React, { useState } from 'react';

interface ArgumentInputProps {
  onSubmit: (argument: string) => void;
  disabled?: boolean;
}

export default function ArgumentInput({ onSubmit, disabled }: ArgumentInputProps) {
  const [newArgument, setNewArgument] = useState('');

  const handleSubmit = () => {
    if (!newArgument.trim()) return;
    onSubmit(newArgument);
    setNewArgument('');
  };

  return (
    <div>
      <div className="flex gap-3">
        <input
          type="text"
          value={newArgument}
          onChange={(e) => setNewArgument(e.target.value)}
          placeholder={disabled ? "Please enter username first..." : "Add your argument to the debate..."}
          className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 bg-white focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 transition-all placeholder-gray-400 disabled:bg-gray-50"
          disabled={disabled}
        />
        <button
          onClick={handleSubmit}
          className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 active:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-sm"
          disabled={disabled || !newArgument.trim()}
        >
          Submit
        </button>
      </div>
    </div>
  );
} 