interface ReflexHUDProps {
  round: number;
  lastReactionTime: number | null;
  averageTime: number | null;
}

const ReflexHUD = ({
  round,
  lastReactionTime,
  averageTime,
}: ReflexHUDProps) => {
  return (
    <div className="flex justify-between items-center mb-4 px-2">
      {/* Round counter */}
      <div className="text-cream text-xl">
        <span className="text-cream/60">Round </span>
        <span className="font-semibold">{round}</span>
      </div>

      {/* Last reaction time */}
      <div className="text-mint text-3xl font-bold">
        {lastReactionTime !== null ? `${lastReactionTime}ms` : "—"}
      </div>

      {/* Average time */}
      <div className="text-cream text-xl">
        <span className="text-cream/60">Avg: </span>
        <span className="font-semibold">
          {averageTime !== null ? `${Math.round(averageTime)}ms` : "—"}
        </span>
      </div>
    </div>
  );
};

export default ReflexHUD;
