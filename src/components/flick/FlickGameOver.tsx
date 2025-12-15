import useRedirections from "@/hooks/useRedirections";
import type { IFlickRoundResult } from "@/types/TargetTypes";

interface FlickGameOverProps {
  results: IFlickRoundResult[];
  onPlayAgain: () => void;
}

const FlickGameOver = ({ results, onPlayAgain }: FlickGameOverProps) => {
  const { goToGames } = useRedirections();

  const hits = results.filter((r) => r.hit).length;
  const misses = results.filter((r) => !r.hit).length;
  const hitResults = results.filter((r) => r.hit);

  const averageTime =
    hitResults.length > 0
      ? Math.round(
          hitResults.reduce((acc, r) => acc + r.reactionTime, 0) /
            hitResults.length
        )
      : 0;

  const bestTime =
    hitResults.length > 0
      ? Math.min(...hitResults.map((r) => r.reactionTime))
      : 0;

  const worstTime =
    hitResults.length > 0
      ? Math.max(...hitResults.map((r) => r.reactionTime))
      : 0;

  const accuracy =
    results.length > 0 ? Math.round((hits / results.length) * 100) : 0;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <h2 className="text-mint text-4xl font-bold">Results</h2>

      <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-cream text-xl">
        <div className="flex justify-between gap-8">
          <span className="text-cream/60">Accuracy:</span>
          <span className="font-semibold">{accuracy}%</span>
        </div>
        <div className="flex justify-between gap-8">
          <span className="text-cream/60">Hits/Misses:</span>
          <span className="font-semibold">
            <span className="text-mint">{hits}</span>
            <span className="text-cream/40"> / </span>
            <span className="text-red-400">{misses}</span>
          </span>
        </div>
        <div className="flex justify-between gap-8">
          <span className="text-cream/60">Average:</span>
          <span className="font-semibold">{averageTime}ms</span>
        </div>
        <div className="flex justify-between gap-8">
          <span className="text-cream/60">Best:</span>
          <span className="font-semibold text-mint">{bestTime}ms</span>
        </div>
        <div className="flex justify-between gap-8">
          <span className="text-cream/60">Worst:</span>
          <span className="font-semibold text-red-400">{worstTime}ms</span>
        </div>
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

export default FlickGameOver;
