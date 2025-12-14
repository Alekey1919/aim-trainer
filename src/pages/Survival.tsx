import { useCallback, useEffect, useRef, useState } from "react";
import GameArea from "../components/shared/GameArea";
import GameLayout from "../components/shared/GameLayout";
import GameOver from "../components/survival/SurvivalGameOver";
import GameHUD from "../components/survival/SurvivalHUD";
import SurvivalSettings from "../components/survival/SurvivalSettings";
import Target from "../components/survival/SurvivalTarget";
import {
  DIFFICULTY_CONFIG,
  GamePhase,
  type ISurvivalSettings,
  type ITargetData,
  TARGET_SIZES,
} from "../types/TargetTypes";

const MAX_LIVES = 3;

const Survival = () => {
  // Game settings
  const [settings, setSettings] = useState<ISurvivalSettings>({
    difficulty: "medium",
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
  const spawnTimeoutRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<number | null>(null);

  // Get current difficulty config
  const difficultyConfig = DIFFICULTY_CONFIG[settings.difficulty];

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
      duration: difficultyConfig.targetSpeed * 1000,
      createdAt: Date.now(),
    };
    setTargets((prev) => [...prev, newTarget]);
  }, [
    generateRandomPosition,
    settings.targetSize,
    difficultyConfig.targetSpeed,
  ]);

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
        duration: difficultyConfig.targetSpeed * 1000,
        createdAt: Date.now(),
      },
    ]);
  }, [
    generateRandomPosition,
    settings.targetSize,
    difficultyConfig.targetSpeed,
  ]);

  // Handle play again
  const handlePlayAgain = useCallback(() => {
    startGame();
  }, [startGame]);

  // Use refs to avoid stale closures in the spawn loop
  const spawnTargetRef = useRef(spawnTarget);
  const difficultyConfigRef = useRef(difficultyConfig);
  const timeElapsedRef = useRef(timeElapsed);

  // Keep refs updated
  useEffect(() => {
    spawnTargetRef.current = spawnTarget;
  }, [spawnTarget]);

  useEffect(() => {
    difficultyConfigRef.current = difficultyConfig;
  }, [difficultyConfig]);

  useEffect(() => {
    timeElapsedRef.current = timeElapsed;
  }, [timeElapsed]);

  // Set up spawn timeout when playing (uses dynamic interval)
  useEffect(() => {
    if (phase === GamePhase.Playing) {
      const scheduleNextSpawn = () => {
        const {
          initialSpawnInterval,
          minSpawnInterval,
          spawnIntervalDecreaseRate,
        } = difficultyConfigRef.current;
        const decrease = timeElapsedRef.current * spawnIntervalDecreaseRate;
        const currentInterval = Math.max(
          minSpawnInterval,
          initialSpawnInterval - decrease
        );

        spawnTimeoutRef.current = window.setTimeout(() => {
          spawnTargetRef.current();
          scheduleNextSpawn();
        }, currentInterval * 1000);
      };

      scheduleNextSpawn();

      return () => {
        if (spawnTimeoutRef.current) {
          clearTimeout(spawnTimeoutRef.current);
        }
      };
    }
  }, [phase]);

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
      if (spawnTimeoutRef.current) {
        clearTimeout(spawnTimeoutRef.current);
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
  }, [phase]);

  return (
    <GameLayout title="Click all targets">
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
        <div className="w-full m-auto max-w-[1500px] relative">
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
        </div>
      )}

      {/* Game Over Phase */}
      {phase === GamePhase.GameOver && (
        <GameArea className="flex items-center justify-center">
          <GameOver
            score={score}
            timeElapsed={timeElapsed}
            onPlayAgain={handlePlayAgain}
          />
        </GameArea>
      )}
    </GameLayout>
  );
};

export default Survival;
