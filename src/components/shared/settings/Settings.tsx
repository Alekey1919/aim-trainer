import CrossImg from "@/assets/images/cross.svg";
import { useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useCrosshair } from "../../../hooks/useCrosshair";
import { useSound } from "../../../hooks/useSound";
import type { ICrosshairConfig } from "../../../types/CrosshairTypes";
import {
  DEFAULT_SOUND_CONFIG,
  type ISoundConfig,
} from "../../../types/SoundTypes";
import CrosshairSettingsTab from "./CrosshairSettingsTab";
import SoundSettingsTab from "./SoundSettingsTab";

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

type SettingsTab = "crosshair" | "sounds";

const Settings = ({ isOpen, onClose }: SettingsProps) => {
  const {
    config: crosshairConfig,
    setConfig: setCrosshairConfig,
    resetConfig: resetCrosshairConfig,
  } = useCrosshair();
  const {
    config: soundConfig,
    setConfig: setSoundConfig,
    resetConfig: resetSoundConfig,
  } = useSound();

  const [activeTab, setActiveTab] = useState<SettingsTab>("crosshair");
  const [tempCrosshairConfig, setTempCrosshairConfig] =
    useState<ICrosshairConfig>(crosshairConfig);
  const [tempSoundConfig, setTempSoundConfig] =
    useState<ISoundConfig>(soundConfig);

  // Update temp crosshair config
  const updateCrosshairConfig = useCallback(
    (partial: Partial<ICrosshairConfig>) => {
      setTempCrosshairConfig((prev) => ({ ...prev, ...partial }));
    },
    []
  );

  // Update temp sound config
  const updateSoundConfig = useCallback((partial: Partial<ISoundConfig>) => {
    setTempSoundConfig((prev) => ({ ...prev, ...partial }));
  }, []);

  // Save changes
  const handleSave = useCallback(() => {
    setCrosshairConfig(tempCrosshairConfig);
    setSoundConfig(tempSoundConfig);
    onClose();
  }, [
    setCrosshairConfig,
    tempCrosshairConfig,
    setSoundConfig,
    tempSoundConfig,
    onClose,
  ]);

  // Reset to default (based on active tab)
  const handleReset = useCallback(() => {
    if (activeTab === "crosshair") {
      resetCrosshairConfig();
      setTempCrosshairConfig(crosshairConfig);
    } else {
      resetSoundConfig();
      setTempSoundConfig(DEFAULT_SOUND_CONFIG);
    }
  }, [activeTab, resetCrosshairConfig, crosshairConfig, resetSoundConfig]);

  // Sync temp configs when modal opens
  useEffect(() => {
    console.log("here");
    if (isOpen) {
      setTempCrosshairConfig(crosshairConfig);
      setTempSoundConfig(soundConfig);
    }
  }, [isOpen, crosshairConfig, soundConfig]);

  if (!isOpen) return null;

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
            <CrosshairSettingsTab
              config={tempCrosshairConfig}
              onUpdate={updateCrosshairConfig}
            />
          )}

          {activeTab === "sounds" && (
            <SoundSettingsTab
              config={tempSoundConfig}
              onUpdate={updateSoundConfig}
            />
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

export default Settings;
