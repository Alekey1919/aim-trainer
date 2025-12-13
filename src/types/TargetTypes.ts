export interface IGameMode {
  img: string;
  name: string;
  redirectionUrl: string;
}

export interface ITargetData {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  createdAt: number;
}

// Target size options
export type TargetSize = "small" | "medium" | "large";

export const TARGET_SIZES: Record<TargetSize, number> = {
  small: 30,
  medium: 50,
  large: 70,
};

// Survival game settings
export interface ISurvivalSettings {
  targetSpeed: number; // Duration in seconds for target lifecycle
  spawnInterval: number; // Seconds between spawns
  targetSize: TargetSize;
}

// Game phase constants
export const GamePhase = {
  Settings: "settings",
  Playing: "playing",
  GameOver: "gameOver",
} as const;

export type GamePhase = (typeof GamePhase)[keyof typeof GamePhase];

// Survival game state
export interface ISurvivalGameState {
  phase: GamePhase;
  score: number;
  lives: number;
  timeElapsed: number;
  targets: ITargetData[];
}
