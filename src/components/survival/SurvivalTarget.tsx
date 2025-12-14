import { useEffect, useRef } from "react";
import type { ITargetData } from "../types/TargetTypes";

interface SurvivalTargetProps {
  targetData: ITargetData;
  onClick: () => void;
  onExpire?: () => void;
}

const SurvivalTarget = ({
  targetData: { x, y, size, duration },
  onClick,
  onExpire,
}: SurvivalTargetProps) => {
  // Use ref to store the latest onExpire callback to avoid resetting timer
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onExpireRef.current?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div
      data-target
      className="absolute rounded-full bg-mint cursor-pointer hover:opacity-90 transition-opacity"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        animation: `targetGrowShrink ${duration}ms ease-in-out forwards`,
      }}
      onClick={onClick}
    />
  );
};

export default SurvivalTarget;
