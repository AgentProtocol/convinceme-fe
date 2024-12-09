import { useState, useRef } from 'react';

interface RecordButtonProps {
  onRecordingComplete: (audioBlob: Blob | null) => void;
  onStartRecording: () => void;
}

export default function RecordButton({ onRecordingComplete, onStartRecording }: RecordButtonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    console.log("startRecording");
    onStartRecording?.();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        console.log("onstop");
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        chunksRef.current = [];
        onRecordingComplete?.(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      onRecordingComplete(null);
    }
  };

  const stopRecording = () => {
    console.log("stopRecording");
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  return (
    <button
      onClick={isRecording ? stopRecording : startRecording}
      className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-medium transition-colors duration-200 ${
        isRecording 
          ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/50' 
          : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/50'
      } shadow-lg`}
    >
      {isRecording ? 'Stop' : 'Record'}
    </button>
  );
}
