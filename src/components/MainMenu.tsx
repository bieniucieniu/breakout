import { Link } from "wouter";
import { title, spaceItemsVer } from "./styles/basicStyles.css";
import { Auth } from "./Auth";
import { mainMenu, gameTypeButtons } from "./styles/mainMenu.css";
import { Button } from "./Buttons";
import { useStorage } from "../storage";

export const MainMenu = () => {
  const gameType = useStorage((state) => state.gameType);
  const setGameType = useStorage((state) => state.setGameType);
  return (
    <div className={mainMenu}>
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
          name={"greavity"}
          onClick={() => setGameType("gravity")}
          disabled={gameType === "gravity"}
        />
      </div>
      <span className={spaceItemsVer}>
        <Link href="/breakoutNormal" className={title}>
          play
        </Link>
        <span style={{ fontSize: "1.5rem", opacity: ".5" }}>{gameType}</span>
      </span>
      <Link href="/scoreboard" className={title}>
        scoreboard
      </Link>
      <Auth />
    </div>
  );
};
