import {
  ScoreboardContainer,
  ScoreboardEmptyState,
  ScoreboardEntry,
  ScoreboardTabs,
} from "@/components/shared/scoreboard/ScoreboardComponents";
import {
  formatReactionTime,
  formatRelativeTime,
  getReactionTimeScores,
  type RoundsOption,
} from "@/utils/reactionTimeScores";
import { useState } from "react";

interface ReactionTimeScoreboardProps {
  refreshTrigger?: number;
}

const ROUNDS_OPTIONS: { value: RoundsOption; label: string }[] = [
  { value: 1, label: "1 Round" },
  { value: 3, label: "3 Rounds" },
  { value: 5, label: "5 Rounds" },
  { value: 10, label: "10 Rounds" },
];

const ReactionTimeScoreboard = ({
  refreshTrigger,
}: ReactionTimeScoreboardProps) => {
  const [selectedRounds, setSelectedRounds] = useState<RoundsOption>(5);

  // This ensures the component re-reads scores when trigger changes
  const triggerValue = refreshTrigger ?? 0;
  void triggerValue;

  const allScores = getReactionTimeScores();
  const scores = allScores.filter((s) => s.rounds === selectedRounds);

  if (allScores.length === 0) {
    return null;
  }

  const topThree = scores.slice(0, 3);

  return (
    <ScoreboardContainer>
      <ScoreboardTabs
        options={ROUNDS_OPTIONS}
        selected={selectedRounds}
        onSelect={setSelectedRounds}
      />

      <div className="flex flex-col gap-4">
        {topThree.length === 0 ? (
          <ScoreboardEmptyState
            message={`No scores yet for ${selectedRounds} round${
              selectedRounds > 1 ? "s" : ""
            }`}
          />
        ) : (
          topThree.map((score, index) => (
            <ScoreboardEntry
              key={score.timestamp}
              rank={index + 1}
              timestamp={score.timestamp}
              stats={[
                {
                  label: selectedRounds === 1 ? "Time" : "Avg",
                  value: formatReactionTime(score.averageTime),
                },
              ]}
              formatRelativeTime={formatRelativeTime}
            />
          ))
        )}
      </div>
    </ScoreboardContainer>
  );
};

export default ReactionTimeScoreboard;
