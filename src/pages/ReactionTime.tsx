import { useCallback, useEffect, useRef, useState } from "react";
import ReactionTimeGameOver from "../components/reactionTime/ReactionTimeGameOver";
import ReactionTimeSettings from "../components/reactionTime/ReactionTimeSettings";
import GameArea from "../components/shared/GameArea";
import GameLayout from "../components/shared/GameLayout";
import {
  ReactionTimePhase,
  type IReactionTimeResult,
  type IReactionTimeSettings,
} from "../types/TargetTypes";

// Min and max delay before screen turns green (in ms)
const MIN_DELAY = 1500;
const MAX_DELAY = 5000;

const ReactionTime = () => {
  // Game settings
  const [settings, setSettings] = useState<IReactionTimeSettings>({
    rounds: 5,
  });

  // Game state
  const [phase, setPhase] = useState<ReactionTimePhase>(
    ReactionTimePhase.Settings
  );
  const [currentRound, setCurrentRound] = useState(1);
  const [results, setResults] = useState<IReactionTimeResult[]>([]);
  const [lastReactionTime, setLastReactionTime] = useState<number | null>(null);

  // Timing refs
  const greenTimeRef = useRef<number>(0);
  const delayTimeoutRef = useRef<number | null>(null);

  // Get random delay before turning green
  const getRandomDelay = useCallback(() => {
    return MIN_DELAY + Math.random() * (MAX_DELAY - MIN_DELAY);
  }, []);

  // Start waiting phase (red screen)
  const startWaiting = useCallback(() => {
    setPhase(ReactionTimePhase.Waiting);

    const delay = getRandomDelay();
    delayTimeoutRef.current = window.setTimeout(() => {
      setPhase(ReactionTimePhase.Ready);
      greenTimeRef.current = Date.now();
    }, delay);
  }, [getRandomDelay]);

  // Handle click during game
  const handleGameAreaClick = useCallback(() => {
    if (phase === ReactionTimePhase.Waiting) {
      // Clicked too early!
      if (delayTimeoutRef.current) {
        clearTimeout(delayTimeoutRef.current);
      }
      setPhase(ReactionTimePhase.TooEarly);
    } else if (phase === ReactionTimePhase.Ready) {
      // Calculate reaction time
      const reactionTime = Date.now() - greenTimeRef.current;
      setLastReactionTime(reactionTime);

      // Save result
      const result: IReactionTimeResult = {
        round: currentRound,
        reactionTime,
      };
      setResults((prev) => [...prev, result]);

      setPhase(ReactionTimePhase.Result);
    }
  }, [phase, currentRound]);

  // Continue to next round or end game
  const handleContinue = useCallback(() => {
    if (currentRound >= settings.rounds) {
      // Game over
      setPhase(ReactionTimePhase.GameOver);
    } else {
      // Next round
      setCurrentRound((prev) => prev + 1);
      startWaiting();
    }
  }, [currentRound, settings.rounds, startWaiting]);

  // Retry after clicking too early
  const handleRetry = useCallback(() => {
    startWaiting();
  }, [startWaiting]);

  // Start the game
  const startGame = useCallback(() => {
    setCurrentRound(1);
    setResults([]);
    setLastReactionTime(null);
    startWaiting();
  }, [startWaiting]);

  // Handle play again
  const handlePlayAgain = useCallback(() => {
    startGame();
  }, [startGame]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (delayTimeoutRef.current) {
        clearTimeout(delayTimeoutRef.current);
      }
    };
  }, []);

  // Get background color based on phase
  const getBackgroundClass = () => {
    switch (phase) {
      case ReactionTimePhase.Waiting:
        return "bg-red-900/80 cursor-pointer";
      case ReactionTimePhase.Ready:
        return "bg-mint cursor-pointer";
      case ReactionTimePhase.TooEarly:
        return "bg-red-700";
      default:
        return "";
    }
  };

  // Get message based on phase
  const getMessage = () => {
    switch (phase) {
      case ReactionTimePhase.Waiting:
        return (
          <div className="text-center">
            <p className="text-4xl font-bold text-cream mb-2">Wait...</p>
            <p className="text-cream/60">Click when the screen turns green</p>
          </div>
        );
      case ReactionTimePhase.Ready:
        return (
          <div className="text-center">
            <p className="text-6xl font-bold text-white">CLICK!</p>
          </div>
        );
      case ReactionTimePhase.TooEarly:
        return (
          <div className="text-center">
            <p className="text-4xl font-bold text-cream mb-4">Too early!</p>
            <button
              onClick={handleRetry}
              className="px-8 py-3 bg-cream text-dark-blue font-bold text-lg rounded-lg hover:bg-cream/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        );
      case ReactionTimePhase.Result:
        return (
          <div className="text-center">
            <p className="text-cream/60 text-xl mb-2">
              Round {currentRound} of {settings.rounds}
            </p>
            <p className="text-6xl font-bold text-mint mb-6">
              {lastReactionTime}ms
            </p>
            <button
              onClick={handleContinue}
              className="px-8 py-3 bg-mint text-dark-blue font-bold text-lg rounded-lg hover:bg-mint/90 transition-colors"
            >
              {currentRound >= settings.rounds ? "See Results" : "Continue"}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <GameLayout title="Reaction Time">
      {/* Settings Phase */}
      {phase === ReactionTimePhase.Settings && (
        <GameArea className="flex items-center justify-center">
          <ReactionTimeSettings
            settings={settings}
            onSettingsChange={setSettings}
            onPlay={startGame}
          />
        </GameArea>
      )}

      {/* Playing Phases (Waiting, Ready, TooEarly, Result) */}
      {(phase === ReactionTimePhase.Waiting ||
        phase === ReactionTimePhase.Ready ||
        phase === ReactionTimePhase.TooEarly ||
        phase === ReactionTimePhase.Result) && (
        <div className="w-full m-auto max-w-[1500px] relative">
          {/* Round indicator */}
          {phase !== ReactionTimePhase.TooEarly && (
            <div className="text-cream/60 text-center mb-4">
              Round {currentRound} of {settings.rounds}
            </div>
          )}
          <GameArea
            className={`flex items-center justify-center min-h-100 transition-colors duration-100 ${getBackgroundClass()}`}
            onClick={
              phase === ReactionTimePhase.Waiting ||
              phase === ReactionTimePhase.Ready
                ? handleGameAreaClick
                : undefined
            }
          >
            {getMessage()}
          </GameArea>
        </div>
      )}

      {/* Game Over Phase */}
      {phase === ReactionTimePhase.GameOver && (
        <GameArea className="flex items-center justify-center">
          <ReactionTimeGameOver
            results={results}
            onPlayAgain={handlePlayAgain}
          />
        </GameArea>
      )}
    </GameLayout>
  );
};

export default ReactionTime;
