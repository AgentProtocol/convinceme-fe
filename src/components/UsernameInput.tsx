import { useState } from "react";

export default function UsernameInput({ onConfirmUsername }: { onConfirmUsername: (username: string) => void }) {
  const [username, setUsername] = useState<string>("");

  const handleConfirmUsername = () => {
    onConfirmUsername(username.trim());
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleConfirmUsername()
          }
        }}
        className="w-full mb-4 p-2 border rounded"
      />
      <button
        onClick={handleConfirmUsername}
        className="w-full mb-4 p-2 bg-blue-500 text-white rounded"
      >
        Confirm Username
      </button>
    </>
  );
}