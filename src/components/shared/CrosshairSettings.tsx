import CrossImg from "@/assets/images/cross.svg";
import { useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useCrosshair } from "../../hooks/useCrosshair";
import {
  CROSSHAIR_COLORS,
  CROSSHAIR_PRESETS,
  type CrosshairColor,
  type ICrosshairConfig,
} from "../../types/CrosshairTypes";
import Crosshair from "./Crosshair";

interface CrosshairSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

type SettingsTab = "crosshair" | "sounds";

interface SliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

const SliderRow = ({ label, value, min, max, onChange }: SliderRowProps) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-cream/80 w-32">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 h-2 bg-mint/30 rounded-lg appearance-none cursor-pointer accent-mint"
      />
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-8 h-8 bg-dark-blue border border-light-blue/30 rounded text-cream/60 hover:text-cream"
        >
          −
        </button>
        <span className="w-10 text-center text-cream font-semibold">
          {value}
        </span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          className="w-8 h-8 bg-dark-blue border border-light-blue/30 rounded text-cream/60 hover:text-cream"
        >
          +
        </button>
      </div>
    </div>
  );
};

interface ToggleRowProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

const ToggleRow = ({ label, value, onChange }: ToggleRowProps) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-cream/80">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={twMerge(
          "w-14 h-8 rounded-full transition-colors relative",
          value ? "bg-mint" : "bg-dark-blue border border-light-blue/30"
        )}
      >
        <div
          className={twMerge(
            "w-6 h-6 rounded-full bg-white absolute top-1 transition-all",
            value ? "right-1" : "left-1"
          )}
        />
      </button>
    </div>
  );
};

const CrosshairSettings = ({ isOpen, onClose }: CrosshairSettingsProps) => {
  const { config, setConfig, resetConfig } = useCrosshair();
  const [activeTab, setActiveTab] = useState<SettingsTab>("crosshair");
  const [tempConfig, setTempConfig] = useState<ICrosshairConfig>(config);

  // Update temp config
  const updateTempConfig = useCallback((partial: Partial<ICrosshairConfig>) => {
    setTempConfig((prev) => ({ ...prev, ...partial }));
  }, []);

  // Apply preset
  const applyPreset = useCallback((preset: ICrosshairConfig) => {
    setTempConfig(preset);
  }, []);

  // Save changes
  const handleSave = useCallback(() => {
    setConfig(tempConfig);
    onClose();
  }, [setConfig, tempConfig, onClose]);

  // Reset to default
  const handleReset = useCallback(() => {
    resetConfig();
    setTempConfig(config);
  }, [resetConfig, config]);

  // Sync temp config when modal opens
  useEffect(() => {
    if (isOpen) {
      setTempConfig(config);
    }
  }, [isOpen, config]);

  if (!isOpen) return null;

  const colorOptions: CrosshairColor[] = [
    "green",
    "white",
    "cyan",
    "yellow",
    "red",
    "orange",
    "magenta",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-dark-blue border-2 border-light-blue/30 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-light-blue/30 grid grid-cols-3 items-center">
          <div />
          <h2 className="text-cream text-2xl font-bold text-center mb-0!">
            Settings
          </h2>
          <button onClick={onClose} className="justify-self-end">
            <img
              src={CrossImg}
              alt="Close"
              className="w-12 hover:scale-105 transition-transform"
            />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-light-blue/30">
          {(["crosshair", "sounds"] as SettingsTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={twMerge(
                "px-6 py-3 text-cream/60 hover:text-cream transition-colors capitalize",
                activeTab === tab && "text-mint border-b-2 border-mint"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === "crosshair" && (
            <div className="flex gap-8">
              {/* Preview */}
              <div className="shrink-0">
                <div className="w-20 h-20 bg-dark-blue/80 border border-light-blue/30 rounded flex items-center justify-center">
                  <Crosshair config={tempConfig} size={64} />
                </div>
              </div>

              {/* Settings */}
              <div className="flex-1 space-y-6">
                {/* Presets */}
                <div>
                  <h3 className="text-mint text-lg font-semibold mb-3">
                    Presets:
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {CROSSHAIR_PRESETS.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => applyPreset(preset.config)}
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
                      value={tempConfig.opacity}
                      min={10}
                      max={100}
                      onChange={(v) => updateTempConfig({ opacity: v })}
                    />
                    <div className="flex items-center gap-4">
                      <span className="text-cream/80 w-32">Main Color</span>
                      <div className="flex gap-2 flex-wrap">
                        {colorOptions.map((colorOption) => (
                          <button
                            key={colorOption}
                            onClick={() =>
                              updateTempConfig({ color: colorOption })
                            }
                            className={twMerge(
                              "w-8 h-8 rounded border-2 transition-all",
                              tempConfig.color === colorOption
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
                  <h3 className="text-mint text-lg font-semibold mb-3">
                    Lines:
                  </h3>
                  <div className="space-y-4">
                    <ToggleRow
                      label="Show Lines"
                      value={tempConfig.showLines}
                      onChange={(v) => updateTempConfig({ showLines: v })}
                    />
                    {tempConfig.showLines && (
                      <>
                        <SliderRow
                          label="Gap"
                          value={tempConfig.lineGap}
                          min={0}
                          max={20}
                          onChange={(v) => updateTempConfig({ lineGap: v })}
                        />
                        <SliderRow
                          label="Length"
                          value={tempConfig.lineLength}
                          min={1}
                          max={30}
                          onChange={(v) => updateTempConfig({ lineLength: v })}
                        />
                        <SliderRow
                          label="Thickness"
                          value={tempConfig.lineThickness}
                          min={1}
                          max={10}
                          onChange={(v) =>
                            updateTempConfig({ lineThickness: v })
                          }
                        />
                        <ToggleRow
                          label="T-Style"
                          value={tempConfig.tStyle}
                          onChange={(v) => updateTempConfig({ tStyle: v })}
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
                      value={tempConfig.showDot}
                      onChange={(v) => updateTempConfig({ showDot: v })}
                    />
                    {tempConfig.showDot && (
                      <SliderRow
                        label="Dot Radius"
                        value={tempConfig.dotRadius}
                        min={1}
                        max={10}
                        onChange={(v) => updateTempConfig({ dotRadius: v })}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "general" && (
            <div className="text-cream/60 text-center py-8">
              General settings coming soon...
            </div>
          )}

          {activeTab === "sounds" && (
            <div className="text-cream/60 text-center py-8">
              Sound settings coming soon...
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-center gap-4 p-4 border-t border-light-blue/30">
          <button
            onClick={handleSave}
            className="px-8 py-2 bg-mint text-dark-blue font-bold rounded hover:bg-mint/90 transition-colors"
          >
            Save
          </button>
          <button
            onClick={handleReset}
            className="px-8 py-2 text-cream/60 hover:text-cream transition-colors"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="px-8 py-2 bg-dark-blue border border-light-blue/30 text-cream font-bold rounded hover:bg-light-blue/10 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrosshairSettings;
