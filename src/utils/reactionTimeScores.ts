export type RoundsOption = 1 | 3 | 5 | 10;

export interface ReactionTimeScore {
  averageTime: number;
  rounds: RoundsOption;
  timestamp: number;
}

const STORAGE_KEY = "reaction-time-scores";
const MAX_SCORES_PER_ROUNDS = 10;

// Get scores from localStorage, optionally filtered by rounds
export const getReactionTimeScores = (
  rounds?: RoundsOption
): ReactionTimeScore[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const scores: ReactionTimeScore[] = JSON.parse(stored);
    if (rounds) {
      return scores.filter((s) => s.rounds === rounds);
    }
    return scores;
  } catch {
    return [];
  }
};

// Save a new score to localStorage
export const saveReactionTimeScore = (
  averageTime: number,
  rounds: RoundsOption
): void => {
  const allScores = getReactionTimeScores();
  const newScore: ReactionTimeScore = {
    averageTime,
    rounds,
    timestamp: Date.now(),
  };

  allScores.push(newScore);

  // Sort by average time (ascending - lower is better)
  allScores.sort((a, b) => a.averageTime - b.averageTime);

  // Keep only top MAX_SCORES_PER_ROUNDS for each rounds option
  const roundsOptions: RoundsOption[] = [1, 3, 5, 10];
  const filteredScores: ReactionTimeScore[] = [];

  for (const r of roundsOptions) {
    const roundScores = allScores
      .filter((s) => s.rounds === r)
      .slice(0, MAX_SCORES_PER_ROUNDS);
    filteredScores.push(...roundScores);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredScores));
};

// Format average time for display
export const formatReactionTime = (ms: number): string => {
  return `${ms}ms`;
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
