import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { CrosshairProvider } from "./contexts/CrosshairContext";
import { SoundProvider } from "./contexts/SoundContext";
import Flick from "./pages/Flick";
import GameModes from "./pages/GameModes";
import Homepage from "./pages/Homepage";
import ReactionTime from "./pages/ReactionTime";
import Reflex from "./pages/Reflex";
import Survival from "./pages/Survival";
import Track from "./pages/Track";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Homepage />} />
      <Route path="/game-modes" element={<GameModes />} />
      <Route path="/survival" element={<Survival />} />
      <Route path="/flick" element={<Flick />} />
      <Route path="/track" element={<Track />} />
      <Route path="/reflex" element={<Reflex />} />
      <Route path="/reaction-time" element={<ReactionTime />} />
    </Routes>
  );
};

const App = () => {
  return (
    <SoundProvider>
      <CrosshairProvider>
        <BrowserRouter basename="/aim-trainer">
          <AnimatedRoutes />
        </BrowserRouter>
      </CrosshairProvider>
    </SoundProvider>
  );
};

export default App;
