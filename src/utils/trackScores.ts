export type TrackSpeedOption = "slow" | "medium" | "fast";

export interface TrackScore {
  accuracy: number; // Tracking percentage (0-100)
  speed: TrackSpeedOption;
  timestamp: number;
}

const STORAGE_KEY = "track-scores";
const MAX_SCORES_PER_SPEED = 10;

// Get scores from localStorage, optionally filtered by speed
export const getTrackScores = (speed?: TrackSpeedOption): TrackScore[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const scores: TrackScore[] = JSON.parse(stored);
    if (speed) {
      return scores.filter((s) => s.speed === speed);
    }
    return scores;
  } catch {
    return [];
  }
};

// Save a new score to localStorage
export const saveTrackScore = (
  accuracy: number,
  speed: TrackSpeedOption
): void => {
  const allScores = getTrackScores();
  const newScore: TrackScore = {
    accuracy: Math.round(accuracy * 100) / 100, // Round to 2 decimal places
    speed,
    timestamp: Date.now(),
  };

  allScores.push(newScore);

  // Sort by accuracy (descending - higher is better)
  allScores.sort((a, b) => b.accuracy - a.accuracy);

  // Keep only top MAX_SCORES_PER_SPEED for each speed option
  const speedOptions: TrackSpeedOption[] = ["slow", "medium", "fast"];
  const filteredScores: TrackScore[] = [];

  for (const s of speedOptions) {
    const speedScores = allScores
      .filter((score) => score.speed === s)
      .slice(0, MAX_SCORES_PER_SPEED);
    filteredScores.push(...speedScores);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredScores));
};

// Format accuracy for display
export const formatAccuracy = (accuracy: number): string => {
  return `${Math.round(accuracy)}%`;
};

// Format relative time (e.g., "just now", "2 days ago")
export const formatRelativeTime = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (weeks < 4) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  return `${months} month${months > 1 ? "s" : ""} ago`;
};
