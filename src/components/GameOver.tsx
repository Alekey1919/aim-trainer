interface GameOverProps {
  score: number;
  timeElapsed: number;
  onPlayAgain: () => void;
  onGoBack: () => void;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const GameOver = ({
  score,
  timeElapsed,
  onPlayAgain,
  onGoBack,
}: GameOverProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <h2 className="text-mint text-4xl font-bold">Game Over</h2>

      <div className="flex flex-col items-center gap-4 text-cream text-xl">
        <div className="flex gap-4">
          <span className="text-cream/60">Score:</span>
          <span className="font-semibold">{score}</span>
        </div>
        <div className="flex gap-4">
          <span className="text-cream/60">Time survived:</span>
          <span className="font-semibold">{formatTime(timeElapsed)}</span>
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

export default GameOver;
