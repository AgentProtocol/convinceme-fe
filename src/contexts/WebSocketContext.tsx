import React, { createContext, useContext, useEffect, useState } from 'react';
import websocketService from '../services/websocketService';
import { IS_GAME_DISABLED } from '../constants';

interface WebSocketContextType {
  connectionStatus: string;
  sendMessage: (
    message: string,
    topic: string,
    player_id: string,
    side: string,
    username?: string
  ) => void;
  sendAudio: (audioBlob: Blob, username: string) => void;
  reconnect: () => void;
  isDisabled: boolean;
  pauseConnection: () => void;
  connectToDebate: (debateId: string) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

export const WebSocketProvider: React.FC<{
  children: React.ReactNode;
  debateId: string;
}> = ({ children, debateId }) => {
  const [connectionStatus, setConnectionStatus] =
    useState<string>('Disconnected');

  useEffect(() => {
    // Only connect if the game is not disabled and we have a debate ID
    if (IS_GAME_DISABLED) {
      setConnectionStatus('Paused');
      return;
    }

    if (!debateId) {
      setConnectionStatus('Missing debate ID');
      return;
    }

    // Connect with debate ID
    websocketService.connect(
      {
        onStatusChange: setConnectionStatus,
        onError: (error) => console.error('WebSocket error:', error),
      },
      debateId
    );

    return () => websocketService.disconnect(true);
  }, [debateId]);

  const pauseConnection = () => {
    websocketService.disconnect(true);
    setConnectionStatus('Paused');
  };

  const connectToDebate = (debateId: string) => {
    if (!debateId) {
      console.error('Cannot connect to debate: Missing debate ID');
      setConnectionStatus('Missing debate ID');
      return;
    }

    websocketService.disconnect(true);
    websocketService.connect(
      {
        onStatusChange: setConnectionStatus,
        onError: (error) => console.error('WebSocket error:', error),
      },
      debateId
    );
  };

  const value = {
    connectionStatus,
    sendMessage: (
      message: string,
      topic: string,
      player_id: string,
      side: string,
      username?: string
    ) => {
      if (!IS_GAME_DISABLED) {
        websocketService.sendMessage(message, topic, player_id, side, username);
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
          onError: (error) => console.error('WebSocket error:', error),
        });
      }
    },
    isDisabled: IS_GAME_DISABLED || connectionStatus === 'Paused',
    pauseConnection,
    connectToDebate,
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
