import { Link } from "wouter";
import { title } from "@/styles/basicStyles.css";
import {
  configButton,
  configSideBarHidden,
  configSideBarVisble,
  mainMenu,
  mainMenuContent,
  mainMenuWraper,
} from "@/styles/mainMenu.css";
import { ConfigEditor } from "./ConfigEditor";
import { Button } from "./Buttons";
import { useState } from "react";

export default function MainMenu() {
  const [showConfig, setShowConfig] = useState(false);
  return (
    <div className={mainMenuWraper}>
      <div className={showConfig ? configSideBarVisble : configSideBarHidden}>
        <ConfigEditor back={() => setShowConfig(false)} />
      </div>

      <div className={mainMenu}>
        <div className={mainMenuContent}>
          <Link href="/breakout" className={title}>
            play
          </Link>
        </div>
        <div className={configButton}>
          <Button onClick={() => setShowConfig(!showConfig)}>config</Button>
        </div>
      </div>
    </div>
  );
}
