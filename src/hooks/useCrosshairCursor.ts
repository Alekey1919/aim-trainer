import { useMemo } from "react";
import { CROSSHAIR_COLORS } from "../types/CrosshairTypes";
import { useCrosshair } from "./useCrosshair";

const CURSOR_SIZE = 64;

export const useCrosshairCursor = () => {
  const { config } = useCrosshair();

  const cursorUrl = useMemo(() => {
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
    const center = CURSOR_SIZE / 2;
    const opacityValue = opacity / 100;

    let svgContent = "";

    // Add lines
    if (showLines) {
      const halfThickness = lineThickness / 2;
      const innerOffset = lineGap;
      const outerOffset = lineGap + lineLength;

      // Top line (unless T-style)
      if (!tStyle) {
        svgContent += `<rect x="${center - halfThickness}" y="${
          center - outerOffset
        }" width="${lineThickness}" height="${lineLength}" fill="${hexColor}" opacity="${opacityValue}"/>`;
      }
      // Bottom line
      svgContent += `<rect x="${center - halfThickness}" y="${
        center + innerOffset
      }" width="${lineThickness}" height="${lineLength}" fill="${hexColor}" opacity="${opacityValue}"/>`;
      // Left line
      svgContent += `<rect x="${center - outerOffset}" y="${
        center - halfThickness
      }" width="${lineLength}" height="${lineThickness}" fill="${hexColor}" opacity="${opacityValue}"/>`;
      // Right line
      svgContent += `<rect x="${center + innerOffset}" y="${
        center - halfThickness
      }" width="${lineLength}" height="${lineThickness}" fill="${hexColor}" opacity="${opacityValue}"/>`;
    }

    // Add dot
    if (showDot) {
      svgContent += `<circle cx="${center}" cy="${center}" r="${dotRadius}" fill="${hexColor}" opacity="${opacityValue}"/>`;
    }

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${CURSOR_SIZE}" height="${CURSOR_SIZE}" viewBox="0 0 ${CURSOR_SIZE} ${CURSOR_SIZE}">${svgContent}</svg>`;

    // Encode SVG for use in cursor URL
    const encoded = encodeURIComponent(svg);
    return `url("data:image/svg+xml,${encoded}") ${center} ${center}, crosshair`;
  }, [config]);

  return cursorUrl;
};
