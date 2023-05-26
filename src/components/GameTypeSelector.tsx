import { useStorage } from "../storage";
import { Button } from "./Buttons";
import {
  gameTypeButtons,
  gameTypeButton,
  wraper,
} from "./styles/gameTypeSelector.css";

export const GameTypeSelector = () => {
  const setGameType = useStorage((state) => state.setGameType);
  const gameType = useStorage((state) => state.gameType);
  return (
    <div className={wraper}>
      <div className={gameTypeButtons}>
        <Button
          onClick={() => setGameType("classic")}
          disabled={gameType === "classic"}
          className={gameTypeButton}
        >
          classic
        </Button>
        <Button
          onClick={() => setGameType("gravity")}
          disabled={gameType === "gravity"}
          className={gameTypeButton}
        >
          gravity
        </Button>
        <Button
          onClick={() => setGameType("time")}
          disabled={gameType === "time"}
          className={gameTypeButton}
        >
          time
        </Button>
      </div>
    </div>
  );
};
