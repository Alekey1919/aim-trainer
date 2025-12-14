import FlickImg from "../assets/flick.webp";
import ReactionTimeImg from "../assets/reaction-time.webp";
import ReflexImg from "../assets/reflex.webp";
import SurvivalImg from "../assets/survival.webp";
import TrackingImg from "../assets/tracking.webp";
import GameThumbnail from "../components/shared/GameThumbnail";
import RoutesEnum from "../enums/RoutesEnum";

const gameModes = [
  { name: "Survival", img: SurvivalImg, url: RoutesEnum.Survival },
  { name: "Flick", img: FlickImg, url: RoutesEnum.Flick },
  { name: "Tracking", img: TrackingImg, url: RoutesEnum.Track },
  { name: "Reflex", img: ReflexImg, url: RoutesEnum.Reflex },
  { name: "Reaction Time", img: ReactionTimeImg, url: RoutesEnum.ReactionTime },
];

const GameModes = () => {
  return (
    <div className="layout-padding">
      <h2 className="text-mint text-center tracking-wide">Game Modes</h2>

      <div className="w-full grid grid-cols-4 gap-x-5 gap-y-10 mt-20">
        {gameModes.map((mode) => (
          <GameThumbnail
            key={mode.name}
            img={mode.img}
            name={mode.name}
            url={mode.url}
          />
        ))}
      </div>
    </div>
  );
};

export default GameModes;
