import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_SOUND_CONFIG, type ISoundConfig } from "../types/SoundTypes";

const STORAGE_KEY = "aim-trainer-sound";

interface SoundContextType {
  config: ISoundConfig;
  setConfig: (config: ISoundConfig) => void;
  updateConfig: (partial: Partial<ISoundConfig>) => void;
  resetConfig: () => void;
}

export const SoundContext = createContext<SoundContextType | null>(null);

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfigState] = useState<ISoundConfig>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return { ...DEFAULT_SOUND_CONFIG, ...JSON.parse(saved) };
        } catch {
          return DEFAULT_SOUND_CONFIG;
        }
      }
    }
    return DEFAULT_SOUND_CONFIG;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const setConfig = useCallback((newConfig: ISoundConfig) => {
    setConfigState(newConfig);
  }, []);

  const updateConfig = useCallback((partial: Partial<ISoundConfig>) => {
    setConfigState((prev) => ({ ...prev, ...partial }));
  }, []);

  const resetConfig = useCallback(() => {
    setConfigState(DEFAULT_SOUND_CONFIG);
  }, []);

  return (
    <SoundContext.Provider
      value={{ config, setConfig, updateConfig, resetConfig }}
    >
      {children}
    </SoundContext.Provider>
  );
};
