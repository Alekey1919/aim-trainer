import { type ReactNode } from "react";

interface ScoreboardContainerProps {
  title?: string;
  children: ReactNode;
}

/**
 * Container wrapper for scoreboards with consistent styling
 */
export const ScoreboardContainer = ({
  title = "Your Top Results",
  children,
}: ScoreboardContainerProps) => {
  return (
    <div className="w-full max-w-375 mx-auto mt-8 p-6 bg-dark-blue/50 rounded-lg border border-cream/10">
      <h3 className="text-cream text-2xl font-bold text-center mb-6">
        {title}
      </h3>
      {children}
    </div>
  );
};

interface ScoreboardTabsProps<T extends string | number> {
  options: { value: T; label: string }[];
  selected: T;
  onSelect: (value: T) => void;
}

/**
 * Filter tabs for switching between different score categories
 */
export const ScoreboardTabs = <T extends string | number>({
  options,
  selected,
  onSelect,
}: ScoreboardTabsProps<T>) => {
  return (
    <div className="flex justify-center gap-2 mb-6 flex-wrap">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onSelect(option.value)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selected === option.value
              ? "bg-mint text-dark-blue"
              : "bg-dark-blue border border-cream/30 text-cream hover:bg-cream/10"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

interface ScoreboardEntryProps {
  rank: number;
  timestamp: number;
  stats: { label: string; value: string | number }[];
  formatRelativeTime: (timestamp: number) => string;
}

/**
 * Individual score entry row with rank badge and stats
 */
export const ScoreboardEntry = ({
  rank,
  timestamp,
  stats,
  formatRelativeTime,
}: ScoreboardEntryProps) => {
  return (
    <div className="flex items-center gap-6">
      <div
        className={`w-10 h-10 flex items-center justify-center font-bold text-lg rounded ${
          rank === 1
            ? "bg-mint text-white"
            : "bg-dark-blue border-2 border-cream/30 text-cream"
        }`}
      >
        {rank}
      </div>

      <div className="flex items-center gap-8 text-cream">
        {stats.map((stat, index) => (
          <div key={index}>
            <span className="text-cream/60">{stat.label}: </span>
            <span className="font-semibold">{stat.value}</span>
          </div>
        ))}
        <span className="text-cream/40">{formatRelativeTime(timestamp)}</span>
      </div>
    </div>
  );
};

interface ScoreboardEmptyStateProps {
  message: string;
}

/**
 * Empty state message when no scores exist for the selected filter
 */
export const ScoreboardEmptyState = ({
  message,
}: ScoreboardEmptyStateProps) => {
  return <p className="text-cream/60 text-center py-4">{message}</p>;
};
