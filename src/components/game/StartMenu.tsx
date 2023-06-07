import { menuBG, mainMenu, mainMenuHints } from "../styles/gameMenu.css";
import { title } from "../styles/basicStyles.css";
import { Keys } from "../Display";

export const GameStartMenu = () => {
  return (
    <div className={menuBG}>
      <div className={mainMenu}>
        <h1 className={title}>
          Press
          <Keys className={mainMenuHints} keys={["Space", "tap screen"]} />
          to start
        </h1>
      </div>
    </div>
  );
};
