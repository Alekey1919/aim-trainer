import type { IReflexRoundResult } from "../../types/TargetTypes";

interface ReflexGameOverProps {
  results: IReflexRoundResult[];
  onPlayAgain: () => void;
  onGoBack: () => void;
}

const ReflexGameOver = ({
  results,
  onPlayAgain,
  onGoBack,
}: ReflexGameOverProps) => {
  const rounds = results.length;

  const averageTime =
    rounds > 0
      ? Math.round(results.reduce((acc, r) => acc + r.reactionTime, 0) / rounds)
      : 0;

  const bestTime =
    rounds > 0 ? Math.min(...results.map((r) => r.reactionTime)) : 0;
  const worstTime =
    rounds > 0 ? Math.max(...results.map((r) => r.reactionTime)) : 0;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <h2 className="text-mint text-4xl font-bold">Game Over</h2>

      <div className="flex flex-col items-center gap-4 text-cream text-xl">
        <div className="flex gap-4">
          <span className="text-cream/60">Rounds:</span>
          <span className="font-semibold">{rounds}</span>
        </div>
        <div className="flex gap-4">
          <span className="text-cream/60">Average:</span>
          <span className="font-semibold">{averageTime}ms</span>
        </div>
        <div className="flex gap-4">
          <span className="text-cream/60">Best:</span>
          <span className="font-semibold text-mint">{bestTime}ms</span>
        </div>
        <div className="flex gap-4">
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
          onClick={onGoBack}
          className="px-8 py-3 border-2 border-mint text-mint font-bold text-lg rounded-lg hover:bg-mint/10 transition-colors"
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default ReflexGameOver;
