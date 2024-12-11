import UsernameInput from "./components/UsernameInput";
import RecordButton from "./components/RecordButton";
import { useState } from "react";
import AudioStream from "./components/AudioStream";
import TranscriptList from "./components/TranscriptList";
import WelcomeModal from "./components/WelcomeModal";

function App() {
  const [username, setUsername] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const handleRecordingComplete = async (audioBlob: Blob | null) => {
    setIsRecording(false);
    if (!audioBlob) {
      return;
    }

    const formData = new FormData();
    formData.append("audio", audioBlob);
    formData.append("username", username);

    // const audioUrl = URL.createObjectURL(audioBlob);
    // const audio = new Audio(audioUrl);
    // audio.play();
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

  const startRecording = () => {
    setIsRecording(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <WelcomeModal />
      <h1 className="text-3xl font-bold text-gray-800 mb-8 pt-8 flex justify-center">
        ConvinceMe
      </h1>
      <div className="flex flex-col items-center space-y-4">
        <div className="bg-white pb-4 rounded-lg shadow-md w-96">
          <TranscriptList />
          <AudioStream
            streamUrl="https://audio-edge-5bkfj.fra.h.radiomast.io/ref-128k-mp3-stereo"
            volume={isRecording ? 0.03 : 1.0}
          />
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          {username ?
            <div className="flex justify-center">
              <RecordButton
                onRecordingComplete={handleRecordingComplete}
                onStartRecording={startRecording}
              />
            </div> :
            <UsernameInput onConfirmUsername={setUsername} />}
        </div>
      </div>
    </div>
  );
}

export default App
