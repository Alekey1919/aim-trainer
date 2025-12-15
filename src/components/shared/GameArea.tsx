import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { useCrosshairCursor } from "../../hooks/useCrosshairCursor";

interface GameAreaProps {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  useCrosshair?: boolean;
}

const GameArea = ({
  children,
  onClick,
  className,
  useCrosshair = true,
}: GameAreaProps) => {
  const cursorUrl = useCrosshairCursor();

  return (
    <div
      className={twMerge(
        "relative w-full h-125 bg-dark-blue/50 border-2 border-light-blue/30 rounded-lg overflow-hidden m-auto",
        className
      )}
      style={useCrosshair ? { cursor: cursorUrl } : undefined}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GameArea;
