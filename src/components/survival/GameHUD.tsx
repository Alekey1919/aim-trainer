interface GameHUDProps {
  score: number;
  timeElapsed: number;
  lives: number;
  maxLives: number;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const GameHUD = ({ score, timeElapsed, lives, maxLives }: GameHUDProps) => {
  return (
    <div className="flex justify-between items-center mb-4 px-2">
      {/* Score */}
      <div className="text-cream text-2xl font-semibold">{score}</div>

      {/* Timer */}
      <div className="text-mint text-2xl font-semibold">
        {formatTime(timeElapsed)}
      </div>

      {/* Lives */}
      <div className="flex gap-1">
        {Array.from({ length: maxLives }).map((_, index) => (
          <span
            key={index}
            className={`text-xl ${
              index < lives ? "text-mint" : "text-mint/30"
            }`}
          >
            ♥
          </span>
        ))}
      </div>
    </div>
  );
};

export default GameHUD;
