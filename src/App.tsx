import UsernameInput from "./components/login/UsernameInput";
import RecordButton from "./components/recording/RecordButton";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState<string>("");

  const handleRecordingComplete = async (audioBlob: Blob) => {
    if (!username.trim()) {
      alert("Please enter a username first");
      return;
    }

    const formData = new FormData();
    formData.append("audio", audioBlob);
    formData.append("username", username);

    try {
      //TODO: upload to server
      // const response = await fetch("/api/upload", {
      //   method: "POST",
      //   body: formData,
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to upload audio");
      // }

      console.log("Audio uploaded successfully");
    } catch (error) {
      console.error("Error uploading audio:", error);
      alert("Failed to upload audio");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 pt-8 flex justify-center">
        ConvinceMe
      </h1>
      <div className="flex items-center justify-center">

        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          {username ?
            <>
              <div className="flex justify-center">
                <RecordButton
                  onRecordingComplete={handleRecordingComplete}
                />
              </div>
            </> :
            <UsernameInput onConfirmUsername={setUsername} />}
        </div>
      </div>
    </div>
  );
}

export default App
