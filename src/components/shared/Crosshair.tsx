import { useMemo } from "react";
import {
  CROSSHAIR_COLORS,
  type ICrosshairConfig,
} from "../../types/CrosshairTypes";

interface CrosshairProps {
  config: ICrosshairConfig;
  size?: number;
}

const Crosshair = ({ config, size = 64 }: CrosshairProps) => {
  const {
    opacity,
    color,
    showLines,
    lineGap,
    lineLength,
    lineThickness,
    tStyle,
    showDot,
    dotRadius,
  } = config;

  const hexColor = CROSSHAIR_COLORS[color];
  const center = size / 2;
  const opacityValue = opacity / 100;

  const lines = useMemo(() => {
    if (!showLines) return null;

    const halfThickness = lineThickness / 2;

    // Calculate line positions
    const innerOffset = lineGap;
    const outerOffset = lineGap + lineLength;

    return (
      <g opacity={opacityValue}>
        {/* Top line (unless T-style) */}
        {!tStyle && (
          <rect
            x={center - halfThickness}
            y={center - outerOffset}
            width={lineThickness}
            height={lineLength}
            fill={hexColor}
          />
        )}
        {/* Bottom line */}
        <rect
          x={center - halfThickness}
          y={center + innerOffset}
          width={lineThickness}
          height={lineLength}
          fill={hexColor}
        />
        {/* Left line */}
        <rect
          x={center - outerOffset}
          y={center - halfThickness}
          width={lineLength}
          height={lineThickness}
          fill={hexColor}
        />
        {/* Right line */}
        <rect
          x={center + innerOffset}
          y={center - halfThickness}
          width={lineLength}
          height={lineThickness}
          fill={hexColor}
        />
      </g>
    );
  }, [
    showLines,
    tStyle,
    lineGap,
    lineLength,
    lineThickness,
    hexColor,
    opacityValue,
    center,
  ]);

  const dot = useMemo(() => {
    if (!showDot) return null;

    return (
      <circle
        cx={center}
        cy={center}
        r={dotRadius}
        fill={hexColor}
        opacity={opacityValue}
      />
    );
  }, [showDot, dotRadius, hexColor, opacityValue, center]);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {lines}
      {dot}
    </svg>
  );
};

export default Crosshair;
