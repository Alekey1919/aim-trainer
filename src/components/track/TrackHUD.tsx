interface TrackHUDProps {
  score: number;
  timeRemaining: number;
  trackingPercent: number;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const TrackHUD = ({ score, timeRemaining, trackingPercent }: TrackHUDProps) => {
  return (
    <div className="survival-HUD">
      {/* Score */}
      <div className="text-cream text-2xl font-semibold">
        <span className="text-cream/60 text-lg">Score: </span>
        {score}
      </div>

      {/* Timer */}
      <div className="text-mint text-2xl font-semibold">
        {formatTime(timeRemaining)}
      </div>

      {/* Tracking percentage */}
      <div className="text-cream text-xl">
        <span className="text-cream/60">Tracking: </span>
        <span className="font-semibold">{Math.round(trackingPercent)}%</span>
      </div>
    </div>
  );
};

export default TrackHUD;
