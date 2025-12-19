import type { Difficulty } from "@/types/TargetTypes";

export interface SurvivalScore {
  hits: number;
  time: number;
  timestamp: number;
  difficulty: Difficulty;
}

const STORAGE_KEY = "survival-scores";
const MAX_SCORES_PER_DIFFICULTY = 10;

// Get scores from localStorage, optionally filtered by difficulty
export const getSurvivalScores = (difficulty?: Difficulty): SurvivalScore[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const scores: SurvivalScore[] = JSON.parse(stored);
    if (difficulty) {
      return scores.filter((s) => s.difficulty === difficulty);
    }
    return scores;
  } catch {
    return [];
  }
};

// Save a new score to localStorage
export const saveSurvivalScore = (
  hits: number,
  time: number,
  difficulty: Difficulty
): void => {
  const allScores = getSurvivalScores();
  const newScore: SurvivalScore = {
    hits,
    time,
    timestamp: Date.now(),
    difficulty,
  };

  allScores.push(newScore);

  // Sort by hits (descending), then by time (descending for survival)
  allScores.sort((a, b) => {
    if (b.hits !== a.hits) return b.hits - a.hits;
    return b.time - a.time;
  });

  // Keep only top MAX_SCORES_PER_DIFFICULTY for each difficulty
  const difficulties: Difficulty[] = ["easy", "medium", "hard"];
  const filteredScores: SurvivalScore[] = [];

  for (const diff of difficulties) {
    const diffScores = allScores
      .filter((s) => s.difficulty === diff)
      .slice(0, MAX_SCORES_PER_DIFFICULTY);
    filteredScores.push(...diffScores);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredScores));
};

// Format time as MM:SS (minutes:seconds)
export const formatSurvivalTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
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
