import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface GameAreaProps {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
}

const GameArea = ({ children, onClick, className }: GameAreaProps) => {
  return (
    <div
      className={twMerge(
        "relative w-full h-125 bg-dark-blue/50 border-2 border-light-blue/30 rounded-lg overflow-hidden m-auto",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GameArea;
