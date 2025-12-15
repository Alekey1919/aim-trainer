import useRedirections from "@/hooks/useRedirections";
import type { IReactionTimeResult } from "@/types/TargetTypes";

interface ReactionTimeGameOverProps {
  results: IReactionTimeResult[];
  onPlayAgain: () => void;
}

const ReactionTimeGameOver = ({
  results,
  onPlayAgain,
}: ReactionTimeGameOverProps) => {
  const { goToGames } = useRedirections();

  const averageTime =
    results.length > 0
      ? Math.round(
          results.reduce((acc, r) => acc + r.reactionTime, 0) / results.length
        )
      : 0;

  const bestTime =
    results.length > 0 ? Math.min(...results.map((r) => r.reactionTime)) : 0;

  const worstTime =
    results.length > 0 ? Math.max(...results.map((r) => r.reactionTime)) : 0;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <h2 className="text-mint text-4xl font-bold">Results</h2>

      {/* Stats */}
      <div className="flex flex-col items-center gap-4 text-cream text-xl">
        <div className="flex gap-8">
          <div className="flex flex-col items-center">
            <span className="text-cream/60 text-sm">Average</span>
            <span className="font-semibold text-2xl">{averageTime}ms</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-cream/60 text-sm">Best</span>
            <span className="font-semibold text-2xl text-green-400">
              {bestTime}ms
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-cream/60 text-sm">Worst</span>
            <span className="font-semibold text-2xl text-red-400">
              {worstTime}ms
            </span>
          </div>
        </div>
      </div>

      {/* Individual Results */}
      <div className="flex flex-wrap gap-3 justify-center max-w-md">
        {results.map((result, index) => (
          <div
            key={index}
            className="bg-dark-blue/50 px-4 py-2 rounded-lg text-cream/80"
          >
            <span className="text-cream/50 text-sm">#{result.round}</span>{" "}
            <span className="font-semibold">{result.reactionTime}ms</span>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={onPlayAgain}
          className="px-8 py-3 bg-mint text-dark-blue font-bold text-lg rounded-lg hover:bg-mint/90 transition-colors"
        >
          Play Again
        </button>
        <button
          onClick={goToGames}
          className="px-8 py-3 border-2 border-mint text-mint font-bold text-lg rounded-lg hover:bg-mint/10 transition-colors"
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default ReactionTimeGameOver;
