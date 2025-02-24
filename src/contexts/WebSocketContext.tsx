import React, { createContext, useContext, useEffect, useState } from 'react';
import websocketService from '../services/websocketService';

interface WebSocketContextType {
  connectionStatus: string;
  sendMessage: (message: string, topic: string, username: string, side: string) => void;
  sendAudio: (audioBlob: Blob, username: string) => void;
  reconnect: () => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [connectionStatus, setConnectionStatus] = useState<string>('Disconnected');

  useEffect(() => {
    // Single connection established when the app starts
    websocketService.connect({
      onStatusChange: setConnectionStatus,
      onError: (error) => console.error('WebSocket error:', error)
    });

    return () => websocketService.disconnect();
  }, []);

  const value = {
    connectionStatus,
    sendMessage: websocketService.sendMessage.bind(websocketService),
    sendAudio: websocketService.sendAudio.bind(websocketService),
    reconnect: () => websocketService.reconnect({
      onStatusChange: setConnectionStatus,
      onError: (error) => console.error('WebSocket error:', error)
    })
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