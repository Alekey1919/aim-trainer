import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GameArea from "../components/shared/GameArea";
import GameHUD from "../components/survival/GameHUD";
import GameOver from "../components/survival/GameOver";
import SurvivalSettings from "../components/survival/SurvivalSettings";
import Target from "../components/survival/SurvivalTarget";
import RoutesEnum from "../enums/RoutesEnum";
import {
  GamePhase,
  type ISurvivalSettings,
  type ITargetData,
  TARGET_SIZES,
} from "../types/TargetTypes";

const MAX_LIVES = 3;

const Survival = () => {
  const navigate = useNavigate();

  // Game settings
  const [settings, setSettings] = useState<ISurvivalSettings>({
    targetSpeed: 3,
    spawnInterval: 3,
    targetSize: "medium",
  });

  // Game state
  const [phase, setPhase] = useState<GamePhase>(GamePhase.Settings);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [targets, setTargets] = useState<ITargetData[]>([]);

  // Refs for intervals
  const targetIdCounter = useRef(0);
  const spawnIntervalRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<number | null>(null);

  // Generate random position for a target
  const generateRandomPosition = useCallback(() => {
    // Keep targets away from edges (10% padding)
    const x = 10 + Math.random() * 80;
    const y = 10 + Math.random() * 80;
    return { x, y };
  }, []);

  // Spawn a new target
  const spawnTarget = useCallback(() => {
    const { x, y } = generateRandomPosition();
    const newTarget: ITargetData = {
      id: targetIdCounter.current++,
      x,
      y,
      size: TARGET_SIZES[settings.targetSize],
      duration: settings.targetSpeed * 1000,
      createdAt: Date.now(),
    };
    setTargets((prev) => [...prev, newTarget]);
  }, [generateRandomPosition, settings.targetSize, settings.targetSpeed]);

  // Handle target click
  const handleTargetClick = useCallback((targetId: number) => {
    setTargets((prev) => prev.filter((t) => t.id !== targetId));
    setScore((prev) => prev + 1);
  }, []);

  // Handle target expiration (missed)
  const handleTargetExpire = useCallback((targetId: number) => {
    setTargets((prev) => prev.filter((t) => t.id !== targetId));
    setLives((prev) => {
      const newLives = prev - 1;
      if (newLives <= 0) {
        setPhase(GamePhase.GameOver);
      }
      return newLives;
    });
  }, []);

  // Start the game
  const startGame = useCallback(() => {
    setPhase(GamePhase.Playing);
    setScore(0);
    setLives(MAX_LIVES);
    setTimeElapsed(0);
    setTargets([]);
    targetIdCounter.current = 0;

    // Spawn first target immediately
    const { x, y } = generateRandomPosition();
    setTargets([
      {
        id: targetIdCounter.current++,
        x,
        y,
        size: TARGET_SIZES[settings.targetSize],
        duration: settings.targetSpeed * 1000,
        createdAt: Date.now(),
      },
    ]);
  }, [generateRandomPosition, settings.targetSize, settings.targetSpeed]);

  // Handle play again
  const handlePlayAgain = useCallback(() => {
    startGame();
  }, [startGame]);

  // Handle go back to menu
  const handleGoBack = useCallback(() => {
    navigate(RoutesEnum.GameModes);
  }, [navigate]);

  // Set up spawn interval when playing
  useEffect(() => {
    if (phase === GamePhase.Playing) {
      spawnIntervalRef.current = window.setInterval(() => {
        spawnTarget();
      }, settings.spawnInterval * 1000);

      return () => {
        if (spawnIntervalRef.current) {
          clearInterval(spawnIntervalRef.current);
        }
      };
    }
  }, [phase, settings.spawnInterval, spawnTarget]);

  // Set up timer when playing
  useEffect(() => {
    if (phase === GamePhase.Playing) {
      timerIntervalRef.current = window.setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);

      return () => {
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
        }
      };
    }
  }, [phase]);

  // Clean up intervals on game over
  useEffect(() => {
    if (phase === GamePhase.GameOver) {
      if (spawnIntervalRef.current) {
        clearInterval(spawnIntervalRef.current);
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
  }, [phase]);

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
      <h1 className="text-mint text-center mb-10">Click the targets</h1>

      {/* Settings Phase */}
      {phase === GamePhase.Settings && (
        <GameArea className="flex items-center justify-center">
          <SurvivalSettings
            settings={settings}
            onSettingsChange={setSettings}
            onPlay={startGame}
          />
        </GameArea>
      )}

      {/* Playing Phase */}
      {phase === GamePhase.Playing && (
        <>
          <GameHUD
            score={score}
            timeElapsed={timeElapsed}
            lives={lives}
            maxLives={MAX_LIVES}
          />
          <GameArea>
            {targets.map((target) => (
              <Target
                key={target.id}
                targetData={target}
                onClick={() => handleTargetClick(target.id)}
                onExpire={() => handleTargetExpire(target.id)}
              />
            ))}
          </GameArea>
        </>
      )}

      {/* Game Over Phase */}
      {phase === GamePhase.GameOver && (
        <GameArea className="flex items-center justify-center">
          <GameOver
            score={score}
            timeElapsed={timeElapsed}
            onPlayAgain={handlePlayAgain}
            onGoBack={handleGoBack}
          />
        </GameArea>
      )}
    </div>
  );
};

export default Survival;
