import Cross from "@/assets/images/back.svg";
import SettingsImg from "@/assets/images/settings.svg";
import useRedirections from "@/hooks/useRedirections";
import { useState } from "react";
import Settings from "./settings/Settings";

const GameLayout = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const { goToGames } = useRedirections();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="layout-padding min-h-screen flex flex-col">
      <div className="items-center justify-between grid grid-cols-3">
        <button onClick={goToGames}>
          <img
            src={Cross}
            alt="Go back"
            className="w-14 hover:scale-105 transition-transform"
          />
        </button>
        <h1 className="text-mint text-center">{title}</h1>
        <div className="flex justify-end">
          <button onClick={() => setSettingsOpen(true)} title="Settings">
            <img
              src={SettingsImg}
              alt="Settings"
              className="w-14 hover:scale-105 transition-transform"
            />
          </button>
        </div>
      </div>
      {children}

      <Settings isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
};

export default GameLayout;
