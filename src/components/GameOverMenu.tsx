import { menuBG, key } from "./styles/gameMenu.css";
import { centeredTitle } from "./styles/basicStyles.css";

export const GameOverMenu = () => {
  return (
    <div className={menuBG}>
      <h1 className={centeredTitle}>
        Game Over <br />
        Press <span className={key}>Space</span> /<br />
        <span className={key}>tap screen</span> <br />
        to restart
      </h1>
    </div>
  );
};
