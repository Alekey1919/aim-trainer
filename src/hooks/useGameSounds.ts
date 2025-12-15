import { useCallback, useRef } from "react";
import hitSound from "../assets/sounds/hit.wav";
import lifeLostSound from "../assets/sounds/life-lost.wav";
import missSound from "../assets/sounds/miss.wav";
import { useSound } from "./useSound";

const useGameSounds = () => {
  const { config } = useSound();
  const hitAudioRef = useRef<HTMLAudioElement | null>(null);
  const missAudioRef = useRef<HTMLAudioElement | null>(null);
  const lifeLostAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio elements lazily
  const getHitAudio = useCallback(() => {
    if (!hitAudioRef.current) {
      hitAudioRef.current = new Audio(hitSound);
    }
    hitAudioRef.current.volume = config.volume / 100;
    return hitAudioRef.current;
  }, [config.volume]);

  const getMissAudio = useCallback(() => {
    if (!missAudioRef.current) {
      missAudioRef.current = new Audio(missSound);
    }
    missAudioRef.current.volume = config.volume / 100;
    return missAudioRef.current;
  }, [config.volume]);

  const getLifeLostAudio = useCallback(() => {
    if (!lifeLostAudioRef.current) {
      lifeLostAudioRef.current = new Audio(lifeLostSound);
    }
    lifeLostAudioRef.current.volume = config.volume / 100;
    return lifeLostAudioRef.current;
  }, [config.volume]);

  const playHit = useCallback(() => {
    if (!config.enabled || !config.hitSound) return;
    const audio = getHitAudio();
    audio.currentTime = 0; // Reset to start for rapid plays
    audio.play().catch(() => {
      // Ignore autoplay errors
    });
  }, [getHitAudio, config.enabled, config.hitSound]);

  const playMiss = useCallback(() => {
    if (!config.enabled || !config.missSound) return;
    const audio = getMissAudio();
    audio.currentTime = 0;
    audio.play().catch(() => {
      // Ignore autoplay errors
    });
  }, [getMissAudio, config.enabled, config.missSound]);

  const playLifeLost = useCallback(() => {
    if (!config.enabled || !config.lifeLostSound) return;
    const audio = getLifeLostAudio();
    audio.currentTime = 0;
    audio.play().catch(() => {
      // Ignore autoplay errors
    });
  }, [getLifeLostAudio, config.enabled, config.lifeLostSound]);

  // Preview functions for settings (always play regardless of enabled state)
  const previewHit = useCallback(() => {
    const audio = getHitAudio();
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }, [getHitAudio]);

  const previewMiss = useCallback(() => {
    const audio = getMissAudio();
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }, [getMissAudio]);

  const previewLifeLost = useCallback(() => {
    const audio = getLifeLostAudio();
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }, [getLifeLostAudio]);

  return {
    playHit,
    playMiss,
    playLifeLost,
    previewHit,
    previewMiss,
    previewLifeLost,
  };
};

export default useGameSounds;
