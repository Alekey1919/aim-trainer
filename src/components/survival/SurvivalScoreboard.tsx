import type { Difficulty } from "@/types/TargetTypes";
import {
  formatRelativeTime,
  formatSurvivalTime,
  getSurvivalScores,
  type SurvivalScore,
} from "@/utils/survivalScores";
import { useMemo, useState } from "react";

interface SurvivalScoreboardProps {
  refreshTrigger?: unknown;
}

const DIFFICULTIES: { value: Difficulty; label: string }[] = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const SurvivalScoreboard = ({ refreshTrigger }: SurvivalScoreboardProps) => {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty>("medium");

  const allScores = useMemo(() => {
    // refreshTrigger is used to re-compute scores when it changes
    void refreshTrigger;
    return getSurvivalScores();
  }, [refreshTrigger]);

  const scores: SurvivalScore[] = useMemo(() => {
    return allScores.filter((s) => s.difficulty === selectedDifficulty);
  }, [allScores, selectedDifficulty]);

  // Don't show if no scores exist at all
  if (allScores.length === 0) {
    return null;
  }

  const topThree = scores.slice(0, 3);

  return (
    <div className="w-full max-w-375 mx-auto mt-8 p-6 bg-dark-blue/50 rounded-lg border border-cream/10">
      <h3 className="text-cream text-2xl font-bold text-center mb-6">
        Your Top Results
      </h3>

      {/* Difficulty Tabs */}
      <div className="flex justify-center gap-2 mb-6">
        {DIFFICULTIES.map((diff) => (
          <button
            key={diff.value}
            onClick={() => setSelectedDifficulty(diff.value)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedDifficulty === diff.value
                ? "bg-mint text-dark-blue"
                : "bg-dark-blue border border-cream/30 text-cream hover:bg-cream/10"
            }`}
          >
            {diff.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {topThree.length === 0 ? (
          <p className="text-cream/60 text-center py-4">
            No scores yet for {selectedDifficulty} difficulty
          </p>
        ) : (
          topThree.map((score, index) => (
            <div key={score.timestamp} className="flex items-center gap-6">
              <div
                className={`w-10 h-10 flex items-center justify-center font-bold text-lg rounded ${
                  index === 0
                    ? "bg-mint text-white"
                    : "bg-dark-blue border-2 border-cream/30 text-cream"
                }`}
              >
                {index + 1}
              </div>

              <div className="flex items-center gap-8 text-cream">
                <div>
                  <span className="text-cream/60">Hits: </span>
                  <span className="font-semibold">{score.hits}</span>
                </div>
                <div>
                  <span className="text-cream/60">Time: </span>
                  <span className="font-semibold">
                    {formatSurvivalTime(score.time)}
                  </span>
                </div>
                <span className="text-cream/40">
                  {formatRelativeTime(score.timestamp)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SurvivalScoreboard;
