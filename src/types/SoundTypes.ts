export interface ISoundConfig {
  enabled: boolean;
  volume: number; // 0-100
  hitSound: boolean;
  missSound: boolean;
  lifeLostSound: boolean;
}

export const DEFAULT_SOUND_CONFIG: ISoundConfig = {
  enabled: true,
  volume: 100,
  hitSound: true,
  missSound: true,
  lifeLostSound: true,
};
