import GameThumbnail from "../components/shared/GameThumbnail";
import RoutesEnum from "../enums/RoutesEnum";

const gameModes = [
  { name: "Survival", img: "", url: RoutesEnum.Survival },
  { name: "Flick", img: "", url: RoutesEnum.Flick },
  { name: "Tracking", img: "", url: RoutesEnum.Track },
  { name: "Click speed", img: "", url: undefined },
  { name: "Reflex", img: "", url: RoutesEnum.Reflex },
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
