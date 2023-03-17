import { menuBG } from "./styles/gameMenu.css";
import { centeredTitle } from "./styles/basicStyles.css";

export const GameOverMenu = () => {
  return (
    <div className={menuBG}>
      <h1 className={centeredTitle}>Game Over</h1>
    </div>
  );
};
