interface TrackGameOverProps {
  score: number;
  trackingPercent: number;
  gameTime: number;
  onPlayAgain: () => void;
  onGoBack: () => void;
}

const TrackGameOver = ({
  score,
  trackingPercent,
  gameTime,
  onPlayAgain,
  onGoBack,
}: TrackGameOverProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <h2 className="text-mint text-4xl font-bold">Results</h2>

      <div className="flex flex-col items-center gap-4 text-cream text-xl">
        <div className="flex gap-4">
          <span className="text-cream/60">Final Score:</span>
          <span className="font-semibold text-mint">{score}</span>
        </div>
        <div className="flex gap-4">
          <span className="text-cream/60">Tracking Accuracy:</span>
          <span className="font-semibold">{Math.round(trackingPercent)}%</span>
        </div>
        <div className="flex gap-4">
          <span className="text-cream/60">Game Time:</span>
          <span className="font-semibold">{gameTime}s</span>
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

export default TrackGameOver;
