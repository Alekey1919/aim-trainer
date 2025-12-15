import { twMerge } from "tailwind-merge";

interface FlickTargetProps {
  x: number;
  y: number;
  size: number;
  isActive: boolean;
  onClick: () => void;
}

const FlickTarget = ({ x, y, size, isActive, onClick }: FlickTargetProps) => {
  return (
    <div
      data-target
      className={twMerge(
        "absolute rounded-full transition-all duration-150",
        isActive ? "bg-mint scale-100" : "bg-cream/40 scale-90"
      )}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
      onClick={onClick}
    />
  );
};

export default FlickTarget;
