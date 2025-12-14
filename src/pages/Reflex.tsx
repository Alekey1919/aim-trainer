import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GameArea from "../components/shared/GameArea";
import ReflexGameOver from "../components/reflex/ReflexGameOver";
import ReflexHUD from "../components/reflex/ReflexHUD";
import ReflexSettings from "../components/reflex/ReflexSettings";
import ReflexTarget from "../components/reflex/ReflexTarget";
import RoutesEnum from "../enums/RoutesEnum";
import {
  GamePhase,
  TARGET_SIZES,
  type IReflexRoundResult,
  type IReflexSettings,
} from "../types/TargetTypes";

// Min and max spawn delay in ms
const MIN_SPAWN_DELAY = 1000;
const MAX_SPAWN_DELAY = 3000;

const Reflex = () => {
  const navigate = useNavigate();

  // Game settings
  const [settings, setSettings] = useState<IReflexSettings>({
    targetSize: "medium",
  });

  // Game state
  const [phase, setPhase] = useState<GamePhase>(GamePhase.Settings);
  const [currentRound, setCurrentRound] = useState(0);
  const [targetVisible, setTargetVisible] = useState(false);
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });
  const [results, setResults] = useState<IReflexRoundResult[]>([]);

  // Timing refs
  const targetSpawnTimeRef = useRef<number>(0);
  const spawnTimeoutRef = useRef<number | null>(null);

  // Generate random position for target
  const generateRandomPosition = useCallback(() => {
    const padding = 10;
    const x = padding + Math.random() * (100 - 2 * padding);
    const y = padding + Math.random() * (100 - 2 * padding);
    return { x, y };
  }, []);

  // Generate random spawn delay
  const getRandomDelay = useCallback(() => {
    return (
      MIN_SPAWN_DELAY + Math.random() * (MAX_SPAWN_DELAY - MIN_SPAWN_DELAY)
    );
  }, []);

  // Spawn a target after random delay
  const scheduleNextTarget = useCallback(() => {
    const delay = getRandomDelay();
    spawnTimeoutRef.current = window.setTimeout(() => {
      const position = generateRandomPosition();
      setTargetPosition(position);
      setTargetVisible(true);
      targetSpawnTimeRef.current = Date.now();
    }, delay);
  }, [generateRandomPosition, getRandomDelay]);

  // Handle target click (success)
  const handleTargetClick = useCallback(() => {
    if (!targetVisible) return;

    const reactionTime = Date.now() - targetSpawnTimeRef.current;
    const result: IReflexRoundResult = {
      round: currentRound + 1,
      reactionTime,
    };

    setResults((prev) => [...prev, result]);
    setCurrentRound((prev) => prev + 1);
    setTargetVisible(false);

    // Schedule next target
    scheduleNextTarget();
  }, [targetVisible, currentRound, scheduleNextTarget]);

  // Handle area click (miss - game over if target was visible)
  const handleAreaClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Check if clicked on target
      const target = e.target as HTMLElement;
      if (target.closest("[data-target]")) return;

      // If target was visible, this is a miss - game over
      if (targetVisible) {
        setPhase(GamePhase.GameOver);
        setTargetVisible(false);
        if (spawnTimeoutRef.current) {
          clearTimeout(spawnTimeoutRef.current);
        }
      }
    },
    [targetVisible]
  );

  // Start the game
  const startGame = useCallback(() => {
    setPhase(GamePhase.Playing);
    setCurrentRound(0);
    setResults([]);
    setTargetVisible(false);

    // Schedule first target
    scheduleNextTarget();
  }, [scheduleNextTarget]);

  // Handle play again
  const handlePlayAgain = useCallback(() => {
    startGame();
  }, [startGame]);

  // Handle go back
  const handleGoBack = useCallback(() => {
    navigate(RoutesEnum.GameModes);
  }, [navigate]);

  // Clean up timeout on unmount or game over
  useEffect(() => {
    return () => {
      if (spawnTimeoutRef.current) {
        clearTimeout(spawnTimeoutRef.current);
      }
    };
  }, []);

  // Clean up on game over
  useEffect(() => {
    if (phase === GamePhase.GameOver) {
      if (spawnTimeoutRef.current) {
        clearTimeout(spawnTimeoutRef.current);
      }
    }
  }, [phase]);

  // Calculate stats for HUD
  const lastReactionTime =
    results.length > 0 ? results[results.length - 1].reactionTime : null;
  const averageTime =
    results.length > 0
      ? results.reduce((acc, r) => acc + r.reactionTime, 0) / results.length
      : null;

  // Render phase label
  const getPhaseLabel = () => {
    switch (phase) {
      case GamePhase.Settings:
        return "Game starting";
      case GamePhase.Playing:
        return "Gameplay";
      case GamePhase.GameOver:
        return "Game Over";
    }
  };

  return (
    <div className="layout-padding min-h-screen flex flex-col">
      {/* Phase indicator */}
      <div className="text-cream/50 text-sm mb-4">{getPhaseLabel()}</div>

      {/* Title */}
      <h1 className="text-mint text-center mb-10">Test your reflexes</h1>

      {/* Settings Phase */}
      {phase === GamePhase.Settings && (
        <GameArea className="flex items-center justify-center">
          <ReflexSettings
            settings={settings}
            onSettingsChange={setSettings}
            onPlay={startGame}
          />
        </GameArea>
      )}

      {/* Playing Phase */}
      {phase === GamePhase.Playing && (
        <>
          <ReflexHUD
            round={currentRound + 1}
            lastReactionTime={lastReactionTime}
            averageTime={averageTime}
          />
          <GameArea onClick={handleAreaClick}>
            {targetVisible && (
              <ReflexTarget
                x={targetPosition.x}
                y={targetPosition.y}
                size={TARGET_SIZES[settings.targetSize]}
                onClick={handleTargetClick}
              />
            )}
            {!targetVisible && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-cream/30 text-2xl">
                  Wait for target...
                </span>
              </div>
            )}
          </GameArea>
        </>
      )}

      {/* Game Over Phase */}
      {phase === GamePhase.GameOver && (
        <GameArea className="flex items-center justify-center">
          <ReflexGameOver
            results={results}
            onPlayAgain={handlePlayAgain}
            onGoBack={handleGoBack}
          />
        </GameArea>
      )}
    </div>
  );
};

export default Reflex;
