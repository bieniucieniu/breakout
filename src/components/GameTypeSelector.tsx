import { useStorage } from "../storage";
import { Button } from "./Buttons";
import { gameTypeButtons } from "./styles/gameTypeSelector.css";

export const GameTypeSelector = () => {
  const setGameType = useStorage((state) => state.setGameType);
  const gameType = useStorage((state) => state.gameType);
  return (
    <div className={gameTypeButtons}>
      <Button
        onClick={() => setGameType("classic")}
        disabled={gameType === "classic"}
      >
        classic
      </Button>
      <Button
        onClick={() => setGameType("time")}
        disabled={gameType === "time"}
      >
        time
      </Button>
      <Button
        onClick={() => setGameType("gravity")}
        disabled={gameType === "gravity"}
      >
        gravity
      </Button>
    </div>
  );
};
