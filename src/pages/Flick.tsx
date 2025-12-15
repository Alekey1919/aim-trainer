import FlickGameOver from "@/components/flick/FlickGameOver";
import FlickHUD from "@/components/flick/FlickHUD";
import FlickSettings from "@/components/flick/FlickSettings";
import FlickTarget from "@/components/flick/FlickTarget";
import GameArea from "@/components/shared/GameArea";
import GameLayout from "@/components/shared/GameLayout";
import useGameSounds from "@/hooks/useGameSounds";
import { useCallback, useState } from "react";
import {
  FLICK_DISTANCES,
  GamePhase,
  TARGET_SIZES,
  type IFlickRoundResult,
  type IFlickSettings,
  type IFlickTargetData,
} from "../types/TargetTypes";

const Flick = () => {
  const { playHit, playMiss } = useGameSounds();
  // Game settings
  const [settings, setSettings] = useState<IFlickSettings>({
    targetSize: "medium",
    distance: "medium",
    rounds: 10,
  });

  // Game state
  const [phase, setPhase] = useState<GamePhase>(GamePhase.Settings);
  const [currentRound, setCurrentRound] = useState(1);
  const [targets, setTargets] = useState<
    [IFlickTargetData, IFlickTargetData] | null
  >(null);
  const [activeTargetIndex, setActiveTargetIndex] = useState<0 | 1>(0);
  const [firstClickTime, setFirstClickTime] = useState<number | null>(null);
  const [results, setResults] = useState<IFlickRoundResult[]>([]);

  // Generate two targets at a specific distance apart
  const generateTargetPair = useCallback(() => {
    const distance = FLICK_DISTANCES[settings.distance];
    const size = TARGET_SIZES[settings.targetSize];

    // Generate first target position (keeping away from edges)
    const padding = 15;
    const x1 = padding + Math.random() * (100 - 2 * padding - distance);
    const y1 = padding + Math.random() * (100 - 2 * padding);

    // Generate second target at the configured distance
    // Random angle for variety
    const angle = Math.random() * Math.PI * 2;
    let x2 = x1 + Math.cos(angle) * distance;
    let y2 = y1 + Math.sin(angle) * distance;

    // Clamp to bounds
    x2 = Math.max(padding, Math.min(100 - padding, x2));
    y2 = Math.max(padding, Math.min(100 - padding, y2));

    const target1: IFlickTargetData = {
      id: 1,
      x: x1,
      y: y1,
      size,
      isActive: true,
    };

    const target2: IFlickTargetData = {
      id: 2,
      x: x2,
      y: y2,
      size,
      isActive: false,
    };

    return [target1, target2] as [IFlickTargetData, IFlickTargetData];
  }, [settings.distance, settings.targetSize]);

  // Start the game
  const startGame = useCallback(() => {
    setPhase(GamePhase.Playing);
    setCurrentRound(1);
    setResults([]);
    setActiveTargetIndex(0);
    setFirstClickTime(null);
    setTargets(generateTargetPair());
  }, [generateTargetPair]);

  // Handle target click
  const handleTargetClick = useCallback(
    (targetIndex: 0 | 1) => {
      if (!targets) return;

      const isActiveTarget = targetIndex === activeTargetIndex;

      if (activeTargetIndex === 0 && targetIndex === 0) {
        // First click - start timing
        playHit();
        setFirstClickTime(Date.now());
        setActiveTargetIndex(1);
        setTargets([
          { ...targets[0], isActive: false },
          { ...targets[1], isActive: true },
        ]);
      } else if (activeTargetIndex === 1 && targetIndex === 1) {
        // Second click - record result
        playHit();
        const reactionTime = firstClickTime ? Date.now() - firstClickTime : 0;
        const result: IFlickRoundResult = {
          round: currentRound,
          reactionTime,
          hit: true,
        };
        setResults((prev) => [...prev, result]);

        // Move to next round or end game
        if (currentRound >= settings.rounds) {
          setPhase(GamePhase.GameOver);
        } else {
          setCurrentRound((prev) => prev + 1);
          setActiveTargetIndex(0);
          setFirstClickTime(null);
          setTargets(generateTargetPair());
        }
      } else if (!isActiveTarget) {
        // Clicked wrong target - record miss
        playMiss();
        const reactionTime = firstClickTime ? Date.now() - firstClickTime : 0;
        const result: IFlickRoundResult = {
          round: currentRound,
          reactionTime,
          hit: false,
        };
        setResults((prev) => [...prev, result]);

        // Move to next round or end game
        if (currentRound >= settings.rounds) {
          setPhase(GamePhase.GameOver);
        } else {
          setCurrentRound((prev) => prev + 1);
          setActiveTargetIndex(0);
          setFirstClickTime(null);
          setTargets(generateTargetPair());
        }
      }
    },
    [
      targets,
      activeTargetIndex,
      firstClickTime,
      currentRound,
      settings.rounds,
      generateTargetPair,
      playHit,
      playMiss,
    ]
  );

  // Handle missed click (clicked on game area but not on target)
  const handleAreaClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Only count as miss if we're waiting for second click
      if (phase !== GamePhase.Playing || firstClickTime === null) return;

      // Check if clicked on a target (if so, let target handler deal with it)
      const target = e.target as HTMLElement;
      if (target.closest("[data-target]")) return;

      playMiss();
      const reactionTime = Date.now() - firstClickTime;
      const result: IFlickRoundResult = {
        round: currentRound,
        reactionTime,
        hit: false,
      };
      setResults((prev) => [...prev, result]);

      if (currentRound >= settings.rounds) {
        setPhase(GamePhase.GameOver);
      } else {
        setCurrentRound((prev) => prev + 1);
        setActiveTargetIndex(0);
        setFirstClickTime(null);
        setTargets(generateTargetPair());
      }
    },
    [
      phase,
      firstClickTime,
      currentRound,
      settings.rounds,
      generateTargetPair,
      playMiss,
    ]
  );

  // Handle play again
  const handlePlayAgain = useCallback(() => {
    startGame();
  }, [startGame]);

  // Calculate stats for HUD
  const hitResults = results.filter((r) => r.hit);
  const lastReactionTime =
    hitResults.length > 0
      ? hitResults[hitResults.length - 1].reactionTime
      : null;
  const averageTime =
    hitResults.length > 0
      ? hitResults.reduce((acc, r) => acc + r.reactionTime, 0) /
        hitResults.length
      : null;
  const hits = hitResults.length;
  const misses = results.filter((r) => !r.hit).length;

  return (
    <GameLayout title="Flick between targets">
      {/* Settings Phase */}
      {phase === GamePhase.Settings && (
        <GameArea
          className="flex items-center justify-center"
          useCrosshair={false}
        >
          <FlickSettings
            settings={settings}
            onSettingsChange={setSettings}
            onPlay={startGame}
          />
        </GameArea>
      )}

      {/* Playing Phase */}
      {phase === GamePhase.Playing && targets && (
        <div className="w-full m-auto max-w-[1500px] relative">
          <FlickHUD
            currentRound={currentRound}
            totalRounds={settings.rounds}
            lastReactionTime={lastReactionTime}
            averageTime={averageTime}
            hits={hits}
            misses={misses}
          />
          <GameArea onClick={handleAreaClick}>
            <FlickTarget
              x={targets[0].x}
              y={targets[0].y}
              size={targets[0].size}
              isActive={targets[0].isActive}
              onClick={() => handleTargetClick(0)}
            />
            <FlickTarget
              x={targets[1].x}
              y={targets[1].y}
              size={targets[1].size}
              isActive={targets[1].isActive}
              onClick={() => handleTargetClick(1)}
            />
          </GameArea>
        </div>
      )}

      {/* Game Over Phase */}
      {phase === GamePhase.GameOver && (
        <GameArea
          className="flex items-center justify-center"
          useCrosshair={false}
        >
          <FlickGameOver results={results} onPlayAgain={handlePlayAgain} />
        </GameArea>
      )}
    </GameLayout>
  );
};

export default Flick;
