import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_CROSSHAIR,
  type ICrosshairConfig,
} from "../types/CrosshairTypes";

const STORAGE_KEY = "aim-trainer-crosshair";

interface CrosshairContextType {
  config: ICrosshairConfig;
  setConfig: (config: ICrosshairConfig) => void;
  updateConfig: (partial: Partial<ICrosshairConfig>) => void;
  resetConfig: () => void;
}

export const CrosshairContext = createContext<CrosshairContextType | null>(
  null
);

export const CrosshairProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfigState] = useState<ICrosshairConfig>(() => {
    // Load from localStorage on initial render
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return { ...DEFAULT_CROSSHAIR, ...JSON.parse(saved) };
        } catch {
          return DEFAULT_CROSSHAIR;
        }
      }
    }
    return DEFAULT_CROSSHAIR;
  });

  // Save to localStorage whenever config changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const setConfig = useCallback((newConfig: ICrosshairConfig) => {
    setConfigState(newConfig);
  }, []);

  const updateConfig = useCallback((partial: Partial<ICrosshairConfig>) => {
    setConfigState((prev) => ({ ...prev, ...partial }));
  }, []);

  const resetConfig = useCallback(() => {
    setConfigState(DEFAULT_CROSSHAIR);
  }, []);

  return (
    <CrosshairContext.Provider
      value={{ config, setConfig, updateConfig, resetConfig }}
    >
      {children}
    </CrosshairContext.Provider>
  );
};
