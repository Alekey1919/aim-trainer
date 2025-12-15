import { useContext } from "react";
import { CrosshairContext } from "../contexts/CrosshairContext";

export const useCrosshair = () => {
  const context = useContext(CrosshairContext);
  if (!context) {
    throw new Error("useCrosshair must be used within a CrosshairProvider");
  }

  return context;
};
