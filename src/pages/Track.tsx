import GameArea from "@/components/shared/GameArea";
import GameLayout from "@/components/shared/GameLayout";
import TrackGameOver from "@/components/track/TrackGameOver";
import TrackHUD from "@/components/track/TrackHUD";
import TrackScoreboard from "@/components/track/TrackScoreboard";
import TrackSettings from "@/components/track/TrackSettings";
import TrackTarget from "@/components/track/TrackTarget";
import { saveTrackScore, type TrackSpeedOption } from "@/utils/trackScores";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  GamePhase,
  TARGET_SIZES,
  TRACK_SPEEDS,
  type ITrackSettings,
} from "../types/TargetTypes";

// How often to update game state (ms)
const TICK_RATE = 16; // ~60fps
// How often to change direction (ms)
const DIRECTION_CHANGE_INTERVAL = 500;

const Track = () => {
  // Game settings
  const [settings, setSettings] = useState<ITrackSettings>({
    targetSize: "medium",
    speed: "medium",
    gameTime: 30,
  });

  // Game state
  const [phase, setPhase] = useState<GamePhase>(GamePhase.Settings);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(settings.gameTime);
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  // Tracking stats
  const [totalTicks, setTotalTicks] = useState(0);
  const [hoveringTicks, setHoveringTicks] = useState(0);

  // Refs
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const velocityRef = useRef({ vx: 0, vy: 0 });
  const gameLoopRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const directionChangeRef = useRef<number | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });

  // Generate random velocity based on speed setting
  const generateRandomVelocity = useCallback(() => {
    const speedMultiplier = TRACK_SPEEDS[settings.speed];
    const angle = Math.random() * Math.PI * 2;
    const speed = (0.3 + Math.random() * 0.3) * speedMultiplier;
    return {
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
    };
  }, [settings.speed]);

  // Check if mouse is over target
  const checkHovering = useCallback(() => {
    if (!gameAreaRef.current) return false;

    const rect = gameAreaRef.current.getBoundingClientRect();
    const targetSize = TARGET_SIZES[settings.targetSize];
    const targetRadius = targetSize / 2;

    // Convert target position from percentage to pixels
    const targetX = (targetPosition.x / 100) * rect.width;
    const targetY = (targetPosition.y / 100) * rect.height;

    // Get mouse position relative to game area
    const mouseX = mousePositionRef.current.x - rect.left;
    const mouseY = mousePositionRef.current.y - rect.top;

    // Calculate distance
    const distance = Math.sqrt(
      Math.pow(mouseX - targetX, 2) + Math.pow(mouseY - targetY, 2)
    );

    return distance <= targetRadius;
  }, [targetPosition, settings.targetSize]);

  // Game loop - update target position
  const gameLoop = useCallback(() => {
    setTargetPosition((prev) => {
      let newX = prev.x + velocityRef.current.vx;
      let newY = prev.y + velocityRef.current.vy;

      // Bounce off walls (with padding)
      const padding = 5;
      if (newX <= padding || newX >= 100 - padding) {
        velocityRef.current.vx *= -1;
        newX = Math.max(padding, Math.min(100 - padding, newX));
      }
      if (newY <= padding || newY >= 100 - padding) {
        velocityRef.current.vy *= -1;
        newY = Math.max(padding, Math.min(100 - padding, newY));
      }

      return { x: newX, y: newY };
    });

    // Update tracking stats
    setTotalTicks((prev) => prev + 1);
    const hovering = checkHovering();
    setIsHovering(hovering);
    if (hovering) {
      setHoveringTicks((prev) => prev + 1);
      setScore((prev) => prev + 1);
    }
  }, [checkHovering]);

  // Handle mouse move
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    mousePositionRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  // Start the game
  const startGame = useCallback(() => {
    setPhase(GamePhase.Playing);
    setScore(0);
    setTimeRemaining(settings.gameTime);
    setTargetPosition({ x: 50, y: 50 });
    setTotalTicks(0);
    setHoveringTicks(0);
    setIsHovering(false);
    velocityRef.current = generateRandomVelocity();
  }, [settings.gameTime, generateRandomVelocity]);

  // Handle play again
  const handlePlayAgain = useCallback(() => {
    startGame();
  }, [startGame]);

  // Scoreboard refresh counter
  const [scoreboardRefresh, setScoreboardRefresh] = useState(0);

  // Save score when game ends
  const hasSavedScore = useRef(false);

  useEffect(() => {
    if (
      phase === GamePhase.GameOver &&
      totalTicks > 0 &&
      !hasSavedScore.current
    ) {
      const accuracy = (hoveringTicks / totalTicks) * 100;
      saveTrackScore(accuracy, settings.speed as TrackSpeedOption);
      hasSavedScore.current = true;
      setScoreboardRefresh((prev) => prev + 1);
    } else if (phase === GamePhase.Playing) {
      hasSavedScore.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // Set up game loop when playing
  useEffect(() => {
    if (phase === GamePhase.Playing) {
      gameLoopRef.current = window.setInterval(gameLoop, TICK_RATE);

      return () => {
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
        }
      };
    }
  }, [phase, gameLoop]);

  // Set up direction change interval
  useEffect(() => {
    if (phase === GamePhase.Playing) {
      directionChangeRef.current = window.setInterval(() => {
        // Slightly adjust velocity for more organic movement
        const newVel = generateRandomVelocity();
        velocityRef.current = {
          vx: velocityRef.current.vx * 0.5 + newVel.vx * 0.5,
          vy: velocityRef.current.vy * 0.5 + newVel.vy * 0.5,
        };
      }, DIRECTION_CHANGE_INTERVAL);

      return () => {
        if (directionChangeRef.current) {
          clearInterval(directionChangeRef.current);
        }
      };
    }
  }, [phase, generateRandomVelocity]);

  // Set up game timer
  useEffect(() => {
    if (phase === GamePhase.Playing) {
      timerRef.current = window.setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setPhase(GamePhase.GameOver);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [phase]);

  // Clean up on game over
  useEffect(() => {
    if (phase === GamePhase.GameOver) {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
      if (directionChangeRef.current) clearInterval(directionChangeRef.current);
    }
  }, [phase]);

  // Calculate tracking percentage
  const trackingPercent =
    totalTicks > 0 ? (hoveringTicks / totalTicks) * 100 : 0;

  return (
    <GameLayout title="Track the target">
      {/* Settings Phase */}
      {phase === GamePhase.Settings && (
        <GameArea
          className="flex items-center justify-center"
          useCrosshair={false}
        >
          <TrackSettings
            settings={settings}
            onSettingsChange={setSettings}
            onPlay={startGame}
          />
        </GameArea>
      )}

      {/* Playing Phase */}
      {phase === GamePhase.Playing && (
        <div className="w-full m-auto max-w-[1500px] relative">
          <TrackHUD
            score={score}
            timeRemaining={timeRemaining}
            trackingPercent={trackingPercent}
          />
          <div ref={gameAreaRef} onMouseMove={handleMouseMove}>
            <GameArea useCrosshair={false}>
              <TrackTarget
                x={targetPosition.x}
                y={targetPosition.y}
                size={TARGET_SIZES[settings.targetSize]}
                isHovering={isHovering}
              />
            </GameArea>
          </div>
        </div>
      )}

      {/* Game Over Phase */}
      {phase === GamePhase.GameOver && (
        <GameArea
          className="flex items-center justify-center"
          useCrosshair={false}
        >
          <TrackGameOver
            score={score}
            trackingPercent={trackingPercent}
            gameTime={settings.gameTime}
            onPlayAgain={handlePlayAgain}
          />
        </GameArea>
      )}

      {/* Scoreboard */}
      <TrackScoreboard refreshTrigger={scoreboardRefresh} />
    </GameLayout>
  );
};

export default Track;
