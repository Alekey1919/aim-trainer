import { twMerge } from "tailwind-merge";
import type { IReactionTimeSettings } from "../../types/TargetTypes";

interface ReactionTimeSettingsProps {
  settings: IReactionTimeSettings;
  onSettingsChange: (settings: IReactionTimeSettings) => void;
  onPlay: () => void;
}

const roundOptions = [3, 5, 10];

const ReactionTimeSettings = ({
  settings,
  onSettingsChange,
  onPlay,
}: ReactionTimeSettingsProps) => {
  const handleRoundsChange = (rounds: number) => {
    onSettingsChange({ ...settings, rounds });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="text-cream/80 text-center max-w-md mb-4">
        <p className="text-lg mb-2">How to play:</p>
        <p className="text-cream/60">
          Wait for the screen to turn{" "}
          <span className="text-green-400 font-semibold">green</span>, then
          click as fast as you can!
        </p>
        <p className="text-cream/60 mt-2">
          If you click too early, you'll have to try again.
        </p>
      </div>

      <div className="flex flex-col gap-6 text-lg">
        {/* Number of Rounds */}
        <div className="flex items-center gap-6">
          <span className="text-cream/80 w-32">Rounds:</span>
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
        Start
      </button>
    </div>
  );
};

export default ReactionTimeSettings;
