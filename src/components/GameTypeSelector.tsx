import { useStorage } from "../storage";
import { Button } from "./Buttons";
import { gameTypeButtons } from "./styles/gameTypeSelector.css";

export const GameTypeSelector = () => {
  const setGameType = useStorage((state) => state.setGameType);
  const gameType = useStorage((state) => state.gameType);
  return (
    <div className={gameTypeButtons}>
      <Button
        name={"classic"}
        onClick={() => setGameType("classic")}
        disabled={gameType === "classic"}
      />
      <Button
        name={"time"}
        onClick={() => setGameType("time")}
        disabled={gameType === "time"}
      />
      <Button
        name={"gravity"}
        onClick={() => setGameType("gravity")}
        disabled={gameType === "gravity"}
      />
    </div>
  );
};
