import Cross from "../../assets/back.svg";
import useRedirections from "../../hooks/useRedirections";

const GameLayout = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const { goToGames } = useRedirections();

  return (
    <div className="layout-padding min-h-screen flex flex-col">
      <div className="items-center justify-between grid grid-cols-3">
        <button onClick={goToGames}>
          <img src={Cross} alt="Go back" className="w-14" />
        </button>
        <h1 className="text-mint text-center">{title}</h1>
      </div>
      {children}
    </div>
  );
};

export default GameLayout;
