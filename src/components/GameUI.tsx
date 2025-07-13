import { useState, useEffect, useRef, useCallback } from 'react';
import SideAvatarPlayer from './SideAvatarPlayer';
import ScoreBar from './ScoreBar';
import UnifiedChatList from './UnifiedChatList';
import ArgumentInput from './ArgumentInput';
import LoginButton from './LoginButton';
import WinScreen from './WinScreen';
import { Transcript } from './TranscriptList';
import { useWebSocket } from '../contexts/WebSocketContext';
import { usePrivy } from '@privy-io/react-auth';
import websocketService from '../services/websocketService';
import InactivityModal from './InactivityModal';
import { IS_GAME_DISABLED } from '../constants';
import { Argument } from '../types';
import QRCode from 'qrcode';

interface GameUIProps {
  side1: string;
  side2: string;
  topic: string;
  debateId: string;
}

export default function GameUI({
  side1,
  side2,
  topic,
  debateId,
}: Readonly<GameUIProps>) {
  const { user, logout } = usePrivy();
  const address = user?.id || user?.email?.address || user?.wallet?.address;
  const [debateArguments, setDebateArguments] = useState<Argument[]>([]);
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [showWinScreen, setShowWinScreen] = useState(false);
  const [winnerSide, setWinnerSide] = useState<string>('');
  const [loserSide, setLoserSide] = useState<string>('');
  const [winnerPlayer, setWinnerPlayer] = useState<
    { address: string; email?: string } | undefined
  >();
  const { sendMessage, pauseConnection, reconnect } = useWebSocket();
  const [isInactive, setIsInactive] = useState(false);
  const inactivityTimerRef = useRef<number | null>(null);
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [feedbackQrUrl, setFeedbackQrUrl] = useState<string | null>(null);

  const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds

  const resetInactivityTimer = useCallback(() => {
    if (IS_GAME_DISABLED) {
      return;
    }
    // Clear existing timer
    if (inactivityTimerRef.current) {
      window.clearTimeout(inactivityTimerRef.current);
    }

    // Set new timer
    inactivityTimerRef.current = window.setTimeout(() => {
      setIsInactive(true);
      pauseConnection();
    }, INACTIVITY_TIMEOUT);
  }, [pauseConnection, INACTIVITY_TIMEOUT]);

  const handleResumeGame = () => {
    setIsInactive(false);
    reconnect();
    resetInactivityTimer();
  };

  // Initialize inactivity timer on component mount
  useEffect(() => {
    resetInactivityTimer();

    // Clean up timer on unmount
    return () => {
      if (inactivityTimerRef.current) {
        window.clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [resetInactivityTimer]);

  useEffect(() => {
    const handleNewArgument = (argument: Argument) => {
      // Reset inactivity timer when a new argument is received
      resetInactivityTimer();

      setDebateArguments((prev) => {
        const existingIndex = prev.findIndex(
          (arg) =>
            arg.content === argument.content &&
            arg.player_id === argument.player_id
        );

        if (existingIndex !== -1) {
          // Update existing argument
          const updated = [...prev];
          updated[existingIndex] = argument;
          return updated;
        }

        // Add new argument
        return [...prev, argument];
      });
    };

    const handleNewTranscript = (newTranscript: Transcript) => {
      setTranscripts((prev) => [...prev, newTranscript]);
    };

    // Handle HP/score changes when messages are scored
    const handleGameScore = (gameScore: Record<string, number>) => {
      console.log('Game score updated:', gameScore);

      // Check for win condition (HP reaches 0 or below)
      const side1Score = gameScore[side1] ?? 100;
      const side2Score = gameScore[side2] ?? 100;

      if (side1Score <= 0 && !showWinScreen) {
        // Side 2 wins (side 1's HP reached 0)
        setWinnerSide(side2);
        setLoserSide(side1);
        // For now, set current player as winner if they have an address
        // TODO: Improve logic to determine actual winning player based on side/arguments
        if (address) {
          const displayName = getUserDisplayName() || address;
          setWinnerPlayer({ address: displayName });
        }
        setShowWinScreen(true);
      } else if (side2Score <= 0 && !showWinScreen) {
        // Side 1 wins (side 2's HP reached 0)
        setWinnerSide(side1);
        setLoserSide(side2);
        // For now, set current player as winner if they have an address
        // TODO: Improve logic to determine actual winning player based on side/arguments
        if (address) {
          const displayName = getUserDisplayName() || address;
          setWinnerPlayer({ address: displayName });
        }
        setShowWinScreen(true);
      }
    };

    websocketService.on('argument', handleNewArgument);
    websocketService.on('transcript', handleNewTranscript);
    websocketService.on('game_score', handleGameScore);

    // Cleanup listeners on unmount
    return () => {
      websocketService.off('argument', handleNewArgument);
      websocketService.off('transcript', handleNewTranscript);
      websocketService.off('game_score', handleGameScore);
    };
  }, [side1, side2, showWinScreen, resetInactivityTimer, address]);

  useEffect(() => {
    const fetchArguments = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/debates/${debateId}/arguments`
        );
        console.log('response', response);
        const data = await response.json();
        console.log('data', data);
        if (data.items) {
          // Transform API data to match our Argument interface
          const orderedArguments = data.items.reverse();
          setDebateArguments(orderedArguments);
        } else {
          console.error('No arguments found');
        }
      } catch (error) {
        console.error('Failed to fetch arguments:', error);
      }
    };

    fetchArguments();
  }, [debateId]);

  useEffect(() => {
    const debateUrl = `${window.location.origin}/debate/${debateId}`;
    QRCode.toDataURL(
      debateUrl,
      {
        width: 96,
        margin: 1,
        color: {
          dark: '#1e3a8a',
          light: '#ffffff',
        },
        errorCorrectionLevel: 'H',
      },
      (err: unknown, url: string | undefined) => {
        if (!err && url) setQrUrl(url);
      }
    );

    // Feedback QR code
    const feedbackUrl =
      'https://docs.google.com/forms/d/1Tfqk3GeH_A4sfOPZSB5zq5Z3GTlfKFC85O2yNsNFHRo/viewform?edit_requested=true';
    QRCode.toDataURL(
      feedbackUrl,
      {
        width: 96,
        margin: 1,
        color: {
          dark: '#1e3a8a',
          light: '#ffffff',
        },
        errorCorrectionLevel: 'H',
      },
      (err: unknown, url: string | undefined) => {
        if (!err && url) setFeedbackQrUrl(url);
      }
    );
  }, [debateId]);

  // Helper function to get user's display name
  const getUserDisplayName = () => {
    if (!user) return address;

    // Prioritize Twitter username, then other social usernames, then email
    return (
      user.twitter?.username ||
      user.discord?.username ||
      user.github?.username ||
      user.google?.email ||
      user.email?.address ||
      address ||
      'User'
    );
  };

  const handleSendArgument = (argument: string, side: string) => {
    if (!address || !argument.trim() || !debateId) {
      return;
    }

    try {
      const displayName = getUserDisplayName();

      // Debate ID is required - send with display name
      sendMessage(argument, topic, address, side, displayName);

      // Reset inactivity timer when user sends an argument
      resetInactivityTimer();

      // Don't add temporary argument - only show scored arguments
      // The argument will appear in the feed once it's been scored by the backend
    } catch (error) {
      console.error('Failed to send argument:', error);
    }
  };

  const handleCloseWinScreen = () => {
    setShowWinScreen(false);
  };

  const handleReturnToLobby = () => {
    // Navigate back to lobby (you may want to use router here)
    window.location.href = '/';
  };

  const handleRestartMatch = () => {
    // Navigate to topic selection page to start a new debate
    window.location.href = '/topics';
  };

  return (
    <div className="h-full flex flex-col">
      {/* Win Screen Modal */}
      {showWinScreen && (
        <WinScreen
          winnerSide={winnerSide}
          loserSide={loserSide}
          winnerPlayer={winnerPlayer}
          onClose={handleCloseWinScreen}
          onReturnToLobby={handleReturnToLobby}
          onRestartMatch={handleRestartMatch}
          side1={side1}
        />
      )}

      {/* User Info in top left corner */}
      {user && (
        <div
          id="user-info-corner"
          style={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 50,
            background: 'white',
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            padding: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: 120,
          }}
        >
          <span
            style={{
              fontSize: 12,
              color: '#1e3a8a',
              textAlign: 'center',
              fontWeight: 500,
            }}
          >
            {user.email?.address ||
              user.google?.email ||
              user.twitter?.username ||
              user.discord?.username ||
              user.github?.username ||
              'User'}
          </span>
          <button
            onClick={logout}
            style={{
              fontSize: 10,
              color: '#6b7280',
              marginTop: 4,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Logout
          </button>
        </div>
      )}

      {/* QR Code in bottom right corner */}
      {qrUrl && (
        <div
          id="qr-code-corner"
          style={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 50,
            background: 'white',
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={qrUrl} alt="QR code for this page" width={96} height={96} />
          <span
            style={{
              fontSize: 12,
              color: '#1e3a8a',
              marginTop: 4,
              textAlign: 'center',
              fontWeight: 500,
            }}
          >
            Scan to play
          </span>
          {feedbackQrUrl && (
            <>
              <div style={{ height: 16 }} />
              <img
                src={feedbackQrUrl}
                alt="Feedback QR code"
                width={96}
                height={96}
              />
              <span
                style={{
                  fontSize: 12,
                  color: '#1e3a8a',
                  marginTop: 4,
                  textAlign: 'center',
                  fontWeight: 500,
                }}
              >
                Feedback
              </span>
            </>
          )}
        </div>
      )}
      <InactivityModal isOpen={isInactive} onResume={handleResumeGame} />

      <ScoreBar
        side1={side1}
        side2={side2}
        topic={topic}
        className="shrink-0"
      />

      {/* Main Content */}
      <div className="flex-1 flex gap-3 min-h-0 max-w-7xl mx-auto w-full">
        {/* Left Avatar */}
        <div className="w-32 flex-shrink-0">
          <SideAvatarPlayer side={side1} side1={side1} side2={side2} />
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col gap-3 min-h-0">
          {/* Unified Chat - All Messages */}
          <div className="flex-1 bg-surface-light rounded-xl shadow-soft flex flex-col min-h-0">
          <div className="flex-1 min-h-0">
            <UnifiedChatList
              arguments={debateArguments}
              transcripts={transcripts}
              side1={side1}
            />
          </div>

            <div className="p-3 bg-surface-dark border-t border-gray-100">
              {!user ? (
                <LoginButton />
              ) : (
                <ArgumentInput
                  onSubmit={handleSendArgument}
                  side1={side1}
                  side2={side2}
                />
              )}
            </div>
          </div>
        </div>

        {/* Right Avatar */}
        <div className="w-32 flex-shrink-0">
          <SideAvatarPlayer side={side2} side1={side1} side2={side2} />
        </div>
      </div>
    </div>
  );
}
