import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import RoutesEnum from "../enums/RoutesEnum";

const useRedirections = () => {
  const navigate = useNavigate();

  const goToGames = useCallback(() => {
    navigate(RoutesEnum.GameModes);
  }, [navigate]);

  return { goToGames };
};

export default useRedirections;
