import { twMerge } from "tailwind-merge";
import type {
  FlickDistance,
  IFlickSettings,
  TargetSize,
} from "../types/TargetTypes";

interface FlickSettingsProps {
  settings: IFlickSettings;
  onSettingsChange: (settings: IFlickSettings) => void;
  onPlay: () => void;
}

const sizeOptions: TargetSize[] = ["small", "medium", "large"];
const distanceOptions: FlickDistance[] = ["close", "medium", "far"];
const roundOptions = [5, 10, 15, 20];

const FlickSettings = ({
  settings,
  onSettingsChange,
  onPlay,
}: FlickSettingsProps) => {
  const handleSizeChange = (size: TargetSize) => {
    onSettingsChange({ ...settings, targetSize: size });
  };

  const handleDistanceChange = (distance: FlickDistance) => {
    onSettingsChange({ ...settings, distance });
  };

  const handleRoundsChange = (rounds: number) => {
    onSettingsChange({ ...settings, rounds });
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

        {/* Distance */}
        <div className="flex items-center gap-6">
          <span className="text-cream/80 w-40">Distance:</span>
          <div className="flex gap-3">
            {distanceOptions.map((distance) => (
              <button
                key={distance}
                onClick={() => handleDistanceChange(distance)}
                className={twMerge(
                  "text-cream/60 hover:text-cream transition-colors capitalize underline-offset-4",
                  settings.distance === distance && "text-cream underline"
                )}
              >
                {distance}
              </button>
            ))}
          </div>
        </div>

        {/* Rounds */}
        <div className="flex items-center gap-6">
          <span className="text-cream/80 w-40">Rounds:</span>
          <div className="flex gap-3">
            {roundOptions.map((rounds) => (
              <button
                key={rounds}
                onClick={() => handleRoundsChange(rounds)}
                className={twMerge(
                  "text-cream/60 hover:text-cream transition-colors underline-offset-4",
                  settings.rounds === rounds && "text-cream underline"
                )}
              >
                {rounds}
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

export default FlickSettings;
