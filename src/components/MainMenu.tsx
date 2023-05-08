import { Link } from "wouter";
import { title, spaceItemsVer } from "./styles/basicStyles.css";
import { Auth } from "./Auth";
import { mainMenu } from "./styles/mainMenu.css";
import { useStorage } from "../storage";
import { GameTypeSelector } from "./GameTypeSelector";
import { ConfigEditor } from "./ConfigEditor";

export const MainMenu = () => {
  const gameType = useStorage((state) => state.gameType);
  return (
    <div className={mainMenu}>
      <GameTypeSelector />
      <span className={spaceItemsVer}>
        <Link
          href={gameType === "gravity" ? "/breakoutGravity" : "/breakoutNormal"}
          className={title}
        >
          play
        </Link>
        <span style={{ fontSize: "1.5rem", opacity: ".5" }}>{gameType}</span>
      </span>
      <Link href="/scoreboard" className={title}>
        scoreboard
      </Link>
      <Auth />
      <Link href="/config" className={title}>
        config
      </Link>
    </div>
  );
};
