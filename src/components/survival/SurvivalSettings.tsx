import { twMerge } from "tailwind-merge";
import type { ISurvivalSettings, TargetSize } from "../../types/TargetTypes";

interface SurvivalSettingsProps {
  settings: ISurvivalSettings;
  onSettingsChange: (settings: ISurvivalSettings) => void;
  onPlay: () => void;
}

const speedOptions = [1, 2, 3, 4, 5];
const intervalOptions = [1, 2, 3, 4, 5];
const sizeOptions: TargetSize[] = ["small", "medium", "large"];

const SurvivalSettings = ({
  settings,
  onSettingsChange,
  onPlay,
}: SurvivalSettingsProps) => {
  const handleSpeedChange = (speed: number) => {
    onSettingsChange({ ...settings, targetSpeed: speed });
  };

  const handleIntervalChange = (interval: number) => {
    onSettingsChange({ ...settings, spawnInterval: interval });
  };

  const handleSizeChange = (size: TargetSize) => {
    onSettingsChange({ ...settings, targetSize: size });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="flex flex-col gap-6 text-lg">
        {/* Target Speed */}
        <div className="flex items-center gap-6">
          <span className="text-cream/80 w-40">Target speed:</span>
          <div className="flex gap-3">
            {speedOptions.map((speed) => (
              <button
                key={speed}
                onClick={() => handleSpeedChange(speed)}
                className={twMerge(
                  "text-cream/60 hover:text-cream transition-colors underline-offset-4",
                  settings.targetSpeed === speed && "text-cream underline"
                )}
              >
                {speed} second{speed !== 1 ? "s" : ""}
              </button>
            ))}
          </div>
        </div>

        {/* Spawn Interval */}
        <div className="flex items-center gap-6">
          <span className="text-cream/80 w-40">Spawn interval:</span>
          <div className="flex gap-3">
            {intervalOptions.map((interval) => (
              <button
                key={interval}
                onClick={() => handleIntervalChange(interval)}
                className={twMerge(
                  "text-cream/60 hover:text-cream transition-colors underline-offset-4",
                  settings.spawnInterval === interval && "text-cream underline"
                )}
              >
                {interval} second{interval !== 1 ? "s" : ""}
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
