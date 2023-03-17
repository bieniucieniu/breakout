import { menuBG, key } from "./styles/gameMenu.css";
import { centeredTitle } from "./styles/basicStyles.css";

export const GameOverMenu = () => {
  return (
    <div className={menuBG}>
      <h1 className={centeredTitle}>
        Game Over {"\n"} Press <span className={key}>Space</span> to restart
      </h1>
    </div>
  );
};
