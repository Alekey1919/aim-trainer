import { twMerge } from "tailwind-merge";
import {
  CROSSHAIR_COLORS,
  CROSSHAIR_PRESETS,
  type CrosshairColor,
  type ICrosshairConfig,
} from "../../../types/CrosshairTypes";
import Crosshair from "../Crosshair";
import { SliderRow, ToggleRow } from "./SettingsControls";

interface CrosshairSettingsTabProps {
  config: ICrosshairConfig;
  onUpdate: (partial: Partial<ICrosshairConfig>) => void;
}

const COLOR_OPTIONS: CrosshairColor[] = [
  "green",
  "white",
  "cyan",
  "yellow",
  "red",
  "orange",
  "magenta",
];

const CrosshairSettingsTab = ({
  config,
  onUpdate,
}: CrosshairSettingsTabProps) => {
  return (
    <div className="flex gap-8">
      {/* Preview */}
      <div className="shrink-0">
        <div className="w-20 h-20 bg-dark-blue/80 border border-light-blue/30 rounded flex items-center justify-center">
          <Crosshair config={config} size={64} />
        </div>
      </div>

      {/* Settings */}
      <div className="flex-1 space-y-6">
        {/* Presets */}
        <div>
          <h3 className="text-mint text-lg font-semibold mb-3">Presets:</h3>
          <div className="flex gap-2 flex-wrap">
            {CROSSHAIR_PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => onUpdate(preset.config)}
                className="w-16 h-16 bg-dark-blue/80 border border-light-blue/30 rounded flex items-center justify-center hover:border-mint transition-colors"
                title={preset.name}
              >
                <Crosshair config={preset.config} size={48} />
              </button>
            ))}
          </div>
        </div>

        {/* Basic Options */}
        <div>
          <h3 className="text-mint text-lg font-semibold mb-3">
            Basic Options:
          </h3>
          <div className="space-y-4">
            <SliderRow
              label="Opacity"
              value={config.opacity}
              min={10}
              max={100}
              onChange={(v) => onUpdate({ opacity: v })}
            />
            <div className="flex items-center gap-4">
              <span className="text-cream/80 w-32">Main Color</span>
              <div className="flex gap-2 flex-wrap">
                {COLOR_OPTIONS.map((colorOption) => (
                  <button
                    key={colorOption}
                    onClick={() => onUpdate({ color: colorOption })}
                    className={twMerge(
                      "w-8 h-8 rounded border-2 transition-all",
                      config.color === colorOption
                        ? "border-white scale-110"
                        : "border-transparent hover:border-white/50"
                    )}
                    style={{
                      backgroundColor: CROSSHAIR_COLORS[colorOption],
                    }}
                    title={colorOption}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Lines */}
        <div>
          <h3 className="text-mint text-lg font-semibold mb-3">Lines:</h3>
          <div className="space-y-4">
            <ToggleRow
              label="Show Lines"
              value={config.showLines}
              onChange={(v) => onUpdate({ showLines: v })}
            />
            {config.showLines && (
              <>
                <SliderRow
                  label="Gap"
                  value={config.lineGap}
                  min={0}
                  max={20}
                  onChange={(v) => onUpdate({ lineGap: v })}
                />
                <SliderRow
                  label="Length"
                  value={config.lineLength}
                  min={1}
                  max={30}
                  onChange={(v) => onUpdate({ lineLength: v })}
                />
                <SliderRow
                  label="Thickness"
                  value={config.lineThickness}
                  min={1}
                  max={10}
                  onChange={(v) => onUpdate({ lineThickness: v })}
                />
                <ToggleRow
                  label="T-Style"
                  value={config.tStyle}
                  onChange={(v) => onUpdate({ tStyle: v })}
                />
              </>
            )}
          </div>
        </div>

        {/* Dot */}
        <div>
          <h3 className="text-mint text-lg font-semibold mb-3">Dot:</h3>
          <div className="space-y-4">
            <ToggleRow
              label="Show Dot"
              value={config.showDot}
              onChange={(v) => onUpdate({ showDot: v })}
            />
            {config.showDot && (
              <SliderRow
                label="Dot Radius"
                value={config.dotRadius}
                min={1}
                max={10}
                onChange={(v) => onUpdate({ dotRadius: v })}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrosshairSettingsTab;
