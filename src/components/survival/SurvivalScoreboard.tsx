import {
  ScoreboardContainer,
  ScoreboardEmptyState,
  ScoreboardEntry,
  ScoreboardTabs,
} from "@/components/shared/scoreboard/ScoreboardComponents";
import type { Difficulty } from "@/types/TargetTypes";
import {
  formatRelativeTime,
  formatSurvivalTime,
  getSurvivalScores,
} from "@/utils/survivalScores";
import { useState } from "react";

interface SurvivalScoreboardProps {
  refreshTrigger?: number;
}

const DIFFICULTIES: { value: Difficulty; label: string }[] = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const SurvivalScoreboard = ({ refreshTrigger }: SurvivalScoreboardProps) => {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty>("medium");

  // This ensures the component re-reads scores when trigger changes
  const triggerValue = refreshTrigger ?? 0;
  void triggerValue;

  const allScores = getSurvivalScores();
  const scores = allScores.filter((s) => s.difficulty === selectedDifficulty);

  if (allScores.length === 0) {
    return null;
  }

  const topThree = scores.slice(0, 3);

  return (
    <ScoreboardContainer>
      <ScoreboardTabs
        options={DIFFICULTIES}
        selected={selectedDifficulty}
        onSelect={setSelectedDifficulty}
      />

      <div className="flex flex-col gap-4">
        {topThree.length === 0 ? (
          <ScoreboardEmptyState
            message={`No scores yet for ${selectedDifficulty} difficulty`}
          />
        ) : (
          topThree.map((score, index) => (
            <ScoreboardEntry
              key={score.timestamp}
              rank={index + 1}
              timestamp={score.timestamp}
              stats={[
                { label: "Hits", value: score.hits },
                { label: "Time", value: formatSurvivalTime(score.time) },
              ]}
              formatRelativeTime={formatRelativeTime}
            />
          ))
        )}
      </div>
    </ScoreboardContainer>
  );
};

export default SurvivalScoreboard;
