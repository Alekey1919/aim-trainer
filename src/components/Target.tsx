import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import type { ITargetData } from "../types/TargetTypes";

interface TargetProps {
  targetData: ITargetData;
  onClick: () => void;
  onExpire?: () => void;
}

const Target = ({
  targetData: { x, y, size, duration },
  onClick,
  onExpire,
}: TargetProps) => {
  useEffect(() => {
    if (onExpire) {
      const timer = setTimeout(() => {
        onExpire();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onExpire]);

  return (
    <div
      className={twMerge("absolute rounded-full")}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className="bg-cream left-0 right-0 bottom-0 top-0 m-auto w-full h-full rounded-full cursor-pointer hover:opacity-90 transition-opacity"
        style={{
          animation: `targetGrowShrink ${duration}ms ease-in-out forwards`,
        }}
        onClick={onClick}
      />
    </div>
  );
};

export default Target;
