import { twMerge } from "tailwind-merge";
import type { IReflexSettings, TargetSize } from "../types/TargetTypes";

interface ReflexSettingsProps {
  settings: IReflexSettings;
  onSettingsChange: (settings: IReflexSettings) => void;
  onPlay: () => void;
}

const sizeOptions: TargetSize[] = ["small", "medium", "large"];

const ReflexSettings = ({
  settings,
  onSettingsChange,
  onPlay,
}: ReflexSettingsProps) => {
  const handleSizeChange = (size: TargetSize) => {
    onSettingsChange({ ...settings, targetSize: size });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="flex flex-col gap-6 text-lg">
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

      <p className="text-cream/60 text-center max-w-md">
        A target will appear after a random delay (1-3 seconds).
        <br />
        Click it as fast as you can! Missing the target ends the game.
      </p>

      {/* Play Button */}
      <button
        onClick={onPlay}
        className="mt-4 px-12 py-3 bg-mint text-dark-blue font-bold text-xl rounded-lg hover:bg-mint/90 transition-colors"
      >
        Play
      </button>
    </div>
  );
};

export default ReflexSettings;
