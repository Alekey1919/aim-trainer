interface FlickHUDProps {
  currentRound: number;
  totalRounds: number;
  lastReactionTime: number | null;
  averageTime: number | null;
  hits: number;
  misses: number;
}

const FlickHUD = ({
  currentRound,
  totalRounds,
  lastReactionTime,
  averageTime,
  hits,
  misses,
}: FlickHUDProps) => {
  return (
    <div className="flex justify-between items-center mb-4 px-2">
      {/* Round counter */}
      <div className="text-cream text-xl">
        <span className="text-cream/60">Round </span>
        <span className="font-semibold">{currentRound}</span>
        <span className="text-cream/60">/{totalRounds}</span>
      </div>

      {/* Last reaction time */}
      <div className="text-mint text-2xl font-semibold">
        {lastReactionTime !== null ? `${lastReactionTime}ms` : "—"}
      </div>

      {/* Stats */}
      <div className="flex gap-4 text-lg">
        <div>
          <span className="text-cream/60">Avg: </span>
          <span className="text-cream font-semibold">
            {averageTime !== null ? `${Math.round(averageTime)}ms` : "—"}
          </span>
        </div>
        <div>
          <span className="text-mint">{hits}</span>
          <span className="text-cream/40"> / </span>
          <span className="text-red-400">{misses}</span>
        </div>
      </div>
    </div>
  );
};

export default FlickHUD;
