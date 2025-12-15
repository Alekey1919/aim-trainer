import { twMerge } from "tailwind-merge";

interface SliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

export const SliderRow = ({
  label,
  value,
  min,
  max,
  onChange,
}: SliderRowProps) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-cream/80 w-32">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 h-2 bg-mint/30 rounded-lg appearance-none cursor-pointer accent-mint"
      />
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-8 h-8 bg-dark-blue border border-light-blue/30 rounded text-cream/60 hover:text-cream"
        >
          −
        </button>
        <span className="w-10 text-center text-cream font-semibold">
          {value}
        </span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          className="w-8 h-8 bg-dark-blue border border-light-blue/30 rounded text-cream/60 hover:text-cream"
        >
          +
        </button>
      </div>
    </div>
  );
};

interface ToggleRowProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export const ToggleRow = ({ label, value, onChange }: ToggleRowProps) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-cream/80">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={twMerge(
          "w-14 h-8 rounded-full transition-colors relative",
          value ? "bg-mint" : "bg-dark-blue border border-light-blue/30"
        )}
      >
        <div
          className={twMerge(
            "w-6 h-6 rounded-full bg-white absolute top-1 transition-all",
            value ? "right-1" : "left-1"
          )}
        />
      </button>
    </div>
  );
};
