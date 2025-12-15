import { useCallback, useRef } from "react";
import hitSound from "../assets/sounds/hit.wav";
import lifeLostSound from "../assets/sounds/life-lost.wav";
import missSound from "../assets/sounds/miss.wav";

const useGameSounds = () => {
  const hitAudioRef = useRef<HTMLAudioElement | null>(null);
  const missAudioRef = useRef<HTMLAudioElement | null>(null);
  const lifeLostAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio elements lazily
  const getHitAudio = useCallback(() => {
    if (!hitAudioRef.current) {
      hitAudioRef.current = new Audio(hitSound);
    }
    return hitAudioRef.current;
  }, []);

  const getMissAudio = useCallback(() => {
    if (!missAudioRef.current) {
      missAudioRef.current = new Audio(missSound);
    }
    return missAudioRef.current;
  }, []);

  const getLifeLostAudio = useCallback(() => {
    if (!lifeLostAudioRef.current) {
      lifeLostAudioRef.current = new Audio(lifeLostSound);
    }
    return lifeLostAudioRef.current;
  }, []);

  const playHit = useCallback(() => {
    const audio = getHitAudio();
    audio.currentTime = 0; // Reset to start for rapid plays
    audio.play().catch(() => {
      // Ignore autoplay errors
    });
  }, [getHitAudio]);

  const playMiss = useCallback(() => {
    const audio = getMissAudio();
    audio.currentTime = 0;
    audio.play().catch(() => {
      // Ignore autoplay errors
    });
  }, [getMissAudio]);

  const playLifeLost = useCallback(() => {
    const audio = getLifeLostAudio();
    audio.currentTime = 0;
    audio.play().catch(() => {
      // Ignore autoplay errors
    });
  }, [getLifeLostAudio]);

  return { playHit, playMiss, playLifeLost };
};

export default useGameSounds;
