import { twMerge } from "tailwind-merge";
import useGameSounds from "../../../hooks/useGameSounds";
import type { ISoundConfig } from "../../../types/SoundTypes";
import { SliderRow, ToggleRow } from "./SettingsControls";

interface SoundSettingsTabProps {
  config: ISoundConfig;
  onUpdate: (partial: Partial<ISoundConfig>) => void;
}

const SoundSettingsTab = ({ config, onUpdate }: SoundSettingsTabProps) => {
  const { previewHit, previewMiss, previewLifeLost } = useGameSounds();

  return (
    <div className="space-y-6">
      <ToggleRow
        label="Enable Sounds"
        value={config.enabled}
        onChange={(v) => onUpdate({ enabled: v })}
      />

      <SliderRow
        label="Volume:"
        value={config.volume}
        min={0}
        max={100}
        onChange={(v) => onUpdate({ volume: v })}
      />

      {/* Target Hit Sound */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-cream/80">Target Hit Sound</span>
          <button
            onClick={previewHit}
            className="w-8 h-8 flex items-center justify-center text-cream/60 hover:text-cream transition-colors"
            title="Preview sound"
          >
            ▶
          </button>
        </div>
        <button
          onClick={() => onUpdate({ hitSound: !config.hitSound })}
          className={twMerge(
            "w-14 h-8 rounded-full transition-colors relative",
            config.hitSound
              ? "bg-mint"
              : "bg-dark-blue border border-light-blue/30"
          )}
        >
          <div
            className={twMerge(
              "w-6 h-6 rounded-full bg-white absolute top-1 transition-all",
              config.hitSound ? "right-1" : "left-1"
            )}
          />
        </button>
      </div>

      {/* Misclick Sound */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-cream/80">Misclick sound</span>
          <button
            onClick={previewMiss}
            className="w-8 h-8 flex items-center justify-center text-cream/60 hover:text-cream transition-colors"
            title="Preview sound"
          >
            ▶
          </button>
        </div>
        <button
          onClick={() => onUpdate({ missSound: !config.missSound })}
          className={twMerge(
            "w-14 h-8 rounded-full transition-colors relative",
            config.missSound
              ? "bg-mint"
              : "bg-dark-blue border border-light-blue/30"
          )}
        >
          <div
            className={twMerge(
              "w-6 h-6 rounded-full bg-white absolute top-1 transition-all",
              config.missSound ? "right-1" : "left-1"
            )}
          />
        </button>
      </div>

      {/* Missed Target Sound */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-cream/80">Missed Target Sound</span>
          <button
            onClick={previewLifeLost}
            className="w-8 h-8 flex items-center justify-center text-cream/60 hover:text-cream transition-colors"
            title="Preview sound"
          >
            ▶
          </button>
        </div>
        <button
          onClick={() => onUpdate({ lifeLostSound: !config.lifeLostSound })}
          className={twMerge(
            "w-14 h-8 rounded-full transition-colors relative",
            config.lifeLostSound
              ? "bg-mint"
              : "bg-dark-blue border border-light-blue/30"
          )}
        >
          <div
            className={twMerge(
              "w-6 h-6 rounded-full bg-white absolute top-1 transition-all",
              config.lifeLostSound ? "right-1" : "left-1"
            )}
          />
        </button>
      </div>
    </div>
  );
};

export default SoundSettingsTab;
