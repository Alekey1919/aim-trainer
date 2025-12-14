import { twMerge } from "tailwind-merge";
import type {
  Difficulty,
  ISurvivalSettings,
  TargetSize,
} from "../../types/TargetTypes";

interface SurvivalSettingsProps {
  settings: ISurvivalSettings;
  onSettingsChange: (settings: ISurvivalSettings) => void;
  onPlay: () => void;
}

const difficultyOptions: Difficulty[] = ["easy", "medium", "hard"];
const sizeOptions: TargetSize[] = ["small", "medium", "large"];

const SurvivalSettings = ({
  settings,
  onSettingsChange,
  onPlay,
}: SurvivalSettingsProps) => {
  const handleDifficultyChange = (difficulty: Difficulty) => {
    onSettingsChange({ ...settings, difficulty });
  };

  const handleSizeChange = (size: TargetSize) => {
    onSettingsChange({ ...settings, targetSize: size });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="flex flex-col gap-6 text-lg">
        {/* Difficulty */}
        <div className="flex items-center gap-6">
          <span className="text-cream/80 w-40">Difficulty:</span>
          <div className="flex gap-3">
            {difficultyOptions.map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => handleDifficultyChange(difficulty)}
                className={twMerge(
                  "text-cream/60 hover:text-cream transition-colors capitalize underline-offset-4",
                  settings.difficulty === difficulty && "text-cream underline"
                )}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>

        {/* Target Size */}
        <div className="flex items-center gap-6">
          <span className="text-cream/80 w-40">Target size:</span>
          <div className="flex gap-3">
            {sizeOptions.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={twMerge(
                  "text-cream/60 hover:text-cream transition-colors capitalize underline-offset-4",
                  settings.targetSize === size && "text-cream underline"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Play Button */}
      <button
        onClick={onPlay}
        className="mt-8 px-12 py-3 bg-mint text-dark-blue font-bold text-xl rounded-lg hover:bg-mint/90 transition-colors"
      >
        Play
      </button>
    </div>
  );
};

export default SurvivalSettings;
