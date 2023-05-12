import { Link } from "wouter";
import { title } from "./styles/basicStyles.css";
import { Auth } from "./Auth";
import {
  configButton,
  configSideBarHidden,
  configSideBarVisble,
  mainMenu,
  mainMenuContent,
  mainMenuWraper,
} from "./styles/mainMenu.css";
import { useStorage } from "../storage";
import { GameTypeSelector } from "./GameTypeSelector";
import { ConfigEditor } from "./ConfigEditor";
import { Button } from "./Buttons";
import { useState } from "react";

export const MainMenu = () => {
  const gameType = useStorage((state) => state.gameType);
  const [showConfig, setShowConfig] = useState(false);
  return (
    <div className={mainMenuWraper}>
      <div className={showConfig ? configSideBarVisble : configSideBarHidden}>
        <ConfigEditor back={() => setShowConfig(false)} />
      </div>

      <div className={mainMenu}>
        <div className={mainMenuContent}>
          <Link
            href={
              gameType === "gravity" ? "/breakoutGravity" : "/breakoutNormal"
            }
            className={title}
          >
            play
          </Link>
          <span style={{ fontSize: "1.5rem", opacity: ".5" }}>{gameType}</span>
          <GameTypeSelector />
          <Link href="/scoreboard" className={title}>
            scoreboard
          </Link>
          <Auth />
        </div>
        <div className={configButton}>
          <Button name="config" onClick={() => setShowConfig(!showConfig)} />
        </div>
      </div>
    </div>
  );
};
