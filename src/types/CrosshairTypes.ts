// Crosshair color options
export type CrosshairColor =
  | "green"
  | "red"
  | "yellow"
  | "cyan"
  | "magenta"
  | "white"
  | "orange";

export const CROSSHAIR_COLORS: Record<CrosshairColor, string> = {
  green: "#00ff00",
  red: "#ff0000",
  yellow: "#ffff00",
  cyan: "#00ffff",
  magenta: "#ff00ff",
  white: "#ffffff",
  orange: "#ff8800",
};

// Crosshair configuration
export interface ICrosshairConfig {
  // Basic options
  opacity: number; // 0-100
  color: CrosshairColor;

  // Lines
  showLines: boolean;
  lineGap: number; // 0-20
  lineLength: number; // 1-30
  lineThickness: number; // 1-10
  tStyle: boolean; // T-style (no top line)

  // Dot
  showDot: boolean;
  dotRadius: number; // 1-10
}

// Default crosshair config
export const DEFAULT_CROSSHAIR: ICrosshairConfig = {
  opacity: 100,
  color: "green",
  showLines: true,
  lineGap: 7,
  lineLength: 20,
  lineThickness: 3,
  tStyle: true,
  showDot: true,
  dotRadius: 2,
};

// Preset crosshairs
export interface ICrosshairPreset {
  name: string;
  config: ICrosshairConfig;
}

export const CROSSHAIR_PRESETS: ICrosshairPreset[] = [
  {
    name: "Default",
    config: DEFAULT_CROSSHAIR,
  },
  {
    name: "Dot Only",
    config: {
      ...DEFAULT_CROSSHAIR,
      showLines: false,
      showDot: true,
      dotRadius: 4,
      color: "white",
    },
  },
  {
    name: "Classic",
    config: {
      ...DEFAULT_CROSSHAIR,
      tStyle: false,
      showDot: false,
      lineGap: 0,
      lineLength: 15,
      color: "cyan",
    },
  },
  {
    name: "Plus",
    config: {
      ...DEFAULT_CROSSHAIR,
      tStyle: false,
      showDot: true,
      lineGap: 3,
      lineLength: 10,
      lineThickness: 2,
      dotRadius: 2,
      color: "yellow",
    },
  },
  {
    name: "T-Style",
    config: {
      ...DEFAULT_CROSSHAIR,
      tStyle: true,
      showDot: false,
      lineGap: 0,
      lineLength: 20,
      lineThickness: 4,
      color: "red",
    },
  },
  {
    name: "Small Dot",
    config: {
      ...DEFAULT_CROSSHAIR,
      showLines: false,
      showDot: true,
      dotRadius: 2,
      color: "orange",
    },
  },
];
