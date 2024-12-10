import { useState, useRef } from 'react';
import { LiveAudioVisualizer } from 'react-audio-visualize';
import {
  MediaPermissionsErrorType,
  requestMediaPermissions
} from 'mic-check';

interface RecordButtonProps {
  onRecordingComplete: (audioBlob: Blob | null) => void;
  onStartRecording: () => void;
}

export default function RecordButton({ onRecordingComplete, onStartRecording }: RecordButtonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    console.log("startRecording");
    setPermissionError(null);
    onStartRecording();
    
    try {
      // First check permissions using mic-check
      await requestMediaPermissions({ audio: true });
      
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
    } catch (error: any) {
      console.error('Error accessing microphone:', error);
      
      if ('type' in error && typeof error.type === 'string') {
        switch (error.type) {
          case MediaPermissionsErrorType.SystemPermissionDenied:
            setPermissionError('Please allow microphone access in your system settings');
            break;
          case MediaPermissionsErrorType.UserPermissionDenied:
            setPermissionError('Please allow microphone access in your browser settings');
            break;
          case MediaPermissionsErrorType.CouldNotStartVideoSource:
            setPermissionError('Please close other applications that might be using the microphone');
            break;
          default:
            setPermissionError('An error occurred while accessing the microphone');
        }
      } else {
        setPermissionError('An unexpected error occurred');
      }
      
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
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`w-24 h-24 rounded-full flex flex-col items-center justify-center text-white font-medium transition-colors duration-200 ${
          isRecording
            ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/50'
            : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/50'
        } shadow-lg`}
      >
        {mediaRecorderRef.current && isRecording ? (
          <LiveAudioVisualizer
            mediaRecorder={mediaRecorderRef.current}
            width={80}
            height={40}
          />
        ) : <div>Record</div>}
      </button>
      
      {permissionError && (
        <div className="text-red-500 text-sm text-center max-w-xs">
          {permissionError}
        </div>
      )}
    </div>
  );
}
