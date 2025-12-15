import EmptyHeart from "@/assets/images/empty-heart.svg";
import Heart from "@/assets/images/heart.svg";

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
    <div className="survival-HUD">
      {/* Score */}
      <div className="text-cream text-2xl font-semibold">{score}</div>

      {/* Timer */}
      <div className="text-mint text-2xl font-semibold">
        {formatTime(timeElapsed)}
      </div>

      {/* Lives */}
      <div className="flex gap-1">
        {Array.from({ length: maxLives }).map((_, index) => (
          <img
            src={index < lives ? Heart : EmptyHeart}
            alt="Life"
            className="w-6"
          />
        ))}
      </div>
    </div>
  );
};

export default GameHUD;
