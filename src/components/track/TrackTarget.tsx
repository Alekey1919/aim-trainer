import { twMerge } from "tailwind-merge";

interface TrackTargetProps {
  x: number;
  y: number;
  size: number;
  isHovering: boolean;
}

const TrackTarget = ({ x, y, size, isHovering }: TrackTargetProps) => {
  return (
    <div
      data-target
      className={twMerge(
        "absolute rounded-full transition-colors duration-100 pointer-events-none",
        isHovering ? "bg-mint" : "bg-cream"
      )}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default TrackTarget;
