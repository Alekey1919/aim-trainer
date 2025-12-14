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

// Flick game distance options
export type FlickDistance = "close" | "medium" | "far";

export const FLICK_DISTANCES: Record<FlickDistance, number> = {
  close: 20,
  medium: 40,
  far: 60,
};

// Flick game settings
export interface IFlickSettings {
  targetSize: TargetSize;
  distance: FlickDistance;
  rounds: number;
}

// Flick round result
export interface IFlickRoundResult {
  round: number;
  reactionTime: number; // ms between clicks
  hit: boolean;
}

// Flick target data (simpler than survival)
export interface IFlickTargetData {
  id: number;
  x: number;
  y: number;
  size: number;
  isActive: boolean; // the one to click
}

// Track game speed options
export type TrackSpeed = "slow" | "medium" | "fast";

export const TRACK_SPEEDS: Record<TrackSpeed, number> = {
  slow: 1,
  medium: 2,
  fast: 3,
};

// Track game time options (in seconds)
export type TrackGameTime = 15 | 30 | 45 | 60;

// Track game settings
export interface ITrackSettings {
  targetSize: TargetSize;
  speed: TrackSpeed;
  gameTime: TrackGameTime;
}
