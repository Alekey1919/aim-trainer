import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import GameModes from "./pages/GameModes";
import Homepage from "./pages/Homepage";
import Survival from "./pages/Survival";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Homepage />} />
      <Route path="/game-modes" element={<GameModes />} />
      <Route path="/survival" element={<Survival />} />
    </Routes>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
};

export default App;
