import {
  ScoreboardContainer,
  ScoreboardEmptyState,
  ScoreboardEntry,
  ScoreboardTabs,
} from "@/components/shared/scoreboard/ScoreboardComponents";
import {
  formatAccuracy,
  formatRelativeTime,
  getTrackScores,
  type TrackSpeedOption,
} from "@/utils/trackScores";
import { useState } from "react";

interface TrackScoreboardProps {
  refreshTrigger?: number;
}

const SPEED_OPTIONS: { value: TrackSpeedOption; label: string }[] = [
  { value: "slow", label: "Slow" },
  { value: "medium", label: "Medium" },
  { value: "fast", label: "Fast" },
];

const TrackScoreboard = ({ refreshTrigger }: TrackScoreboardProps) => {
  const [selectedSpeed, setSelectedSpeed] =
    useState<TrackSpeedOption>("medium");

  // This ensures the component re-reads scores when trigger changes
  const triggerValue = refreshTrigger ?? 0;
  void triggerValue;

  const allScores = getTrackScores();
  const scores = allScores.filter((s) => s.speed === selectedSpeed);

  if (allScores.length === 0) {
    return null;
  }

  const topThree = scores.slice(0, 3);

  return (
    <ScoreboardContainer>
      <ScoreboardTabs
        options={SPEED_OPTIONS}
        selected={selectedSpeed}
        onSelect={setSelectedSpeed}
      />

      <div className="flex flex-col gap-4">
        {topThree.length === 0 ? (
          <ScoreboardEmptyState
            message={`No scores yet for ${selectedSpeed} speed`}
          />
        ) : (
          topThree.map((score, index) => (
            <ScoreboardEntry
              key={score.timestamp}
              rank={index + 1}
              timestamp={score.timestamp}
              stats={[
                { label: "Accuracy", value: formatAccuracy(score.accuracy) },
              ]}
              formatRelativeTime={formatRelativeTime}
            />
          ))
        )}
      </div>
    </ScoreboardContainer>
  );
};

export default TrackScoreboard;
