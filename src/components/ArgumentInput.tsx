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
    <div className="border-t pt-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={newArgument}
          onChange={(e) => setNewArgument(e.target.value)}
          placeholder={disabled ? "Please enter username first..." : "Add your argument to the debate..."}
          className="flex-1 px-4 py-2 border rounded-lg"
          disabled={disabled}
        />
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={disabled}
        >
          Submit
        </button>
      </div>
    </div>
  );
} 