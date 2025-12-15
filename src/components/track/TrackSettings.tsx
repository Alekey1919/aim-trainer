import type {
  ITrackSettings,
  TargetSize,
  TrackGameTime,
  TrackSpeed,
} from "@/types/TargetTypes";
import { twMerge } from "tailwind-merge";

interface TrackSettingsProps {
  settings: ITrackSettings;
  onSettingsChange: (settings: ITrackSettings) => void;
  onPlay: () => void;
}

const sizeOptions: TargetSize[] = ["small", "medium", "large"];
const speedOptions: TrackSpeed[] = ["slow", "medium", "fast"];
const timeOptions: TrackGameTime[] = [15, 30, 45, 60];

const TrackSettings = ({
  settings,
  onSettingsChange,
  onPlay,
}: TrackSettingsProps) => {
  const handleSizeChange = (size: TargetSize) => {
    onSettingsChange({ ...settings, targetSize: size });
  };

  const handleSpeedChange = (speed: TrackSpeed) => {
    onSettingsChange({ ...settings, speed });
  };

  const handleTimeChange = (gameTime: TrackGameTime) => {
    onSettingsChange({ ...settings, gameTime });
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

        {/* Speed */}
        <div className="flex items-center gap-6">
          <span className="text-cream/80 w-40">Speed:</span>
          <div className="flex gap-3">
            {speedOptions.map((speed) => (
              <button
                key={speed}
                onClick={() => handleSpeedChange(speed)}
                className={twMerge(
                  "text-cream/60 hover:text-cream transition-colors capitalize underline-offset-4",
                  settings.speed === speed && "text-cream underline"
                )}
              >
                {speed}
              </button>
            ))}
          </div>
        </div>

        {/* Game Time */}
        <div className="flex items-center gap-6">
          <span className="text-cream/80 w-40">Game time:</span>
          <div className="flex gap-3">
            {timeOptions.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeChange(time)}
                className={twMerge(
                  "text-cream/60 hover:text-cream transition-colors underline-offset-4",
                  settings.gameTime === time && "text-cream underline"
                )}
              >
                {time}s
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

export default TrackSettings;
