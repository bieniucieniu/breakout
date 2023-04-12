import { menuBG, key } from "./styles/gameMenu.css";
import { centeredTitle } from "./styles/basicStyles.css";
import { useStorage } from "../storage";
import { useEffect, useRef } from "react";

export const GameOverMenu = () => {
  const lastScore = useStorage((state) => state.lastScore);

  return (
    <div className={menuBG}>
      <h1 className={centeredTitle}>
        Game Over <br />
        your score: {lastScore}
        <br />
        Press <span className={key}>Space</span> /<br />
        <span className={key}>tap screen</span> <br />
        to restart
      </h1>
    </div>
  );
};
