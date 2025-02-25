import React, { createContext, useContext, useEffect, useState } from 'react';
import websocketService from '../services/websocketService';
import { IS_GAME_DISABLED } from '../constants';

interface WebSocketContextType {
  connectionStatus: string;
  sendMessage: (message: string, topic: string, username: string, side: string) => void;
  sendAudio: (audioBlob: Blob, username: string) => void;
  reconnect: () => void;
  isDisabled: boolean;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [connectionStatus, setConnectionStatus] = useState<string>('Disconnected');

  useEffect(() => {
    // Only connect if the game is not disabled
    if (IS_GAME_DISABLED) {
      setConnectionStatus('Paused');
      return;
      
    }
    // Single connection established when the app starts
    websocketService.connect({
      onStatusChange: setConnectionStatus,
      onError: (error) => console.error('WebSocket error:', error)
    });

    return () => websocketService.disconnect(true);
  }, []);

  const value = {
    connectionStatus,
    sendMessage: (message: string, topic: string, username: string, side: string) => {
      if (!IS_GAME_DISABLED) {
        websocketService.sendMessage(message, topic, username, side);
      }
    },
    sendAudio: (audioBlob: Blob, username: string) => {
      if (!IS_GAME_DISABLED) {
        websocketService.sendAudio(audioBlob, username);
      }
    },
    reconnect: () => {
      if (!IS_GAME_DISABLED) {
        websocketService.reconnect({
          onStatusChange: setConnectionStatus,
          onError: (error) => console.error('WebSocket error:', error)
        });
      }
    },
    isDisabled: IS_GAME_DISABLED
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
}; 