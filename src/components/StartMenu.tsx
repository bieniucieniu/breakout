import { menuBG, key } from "./styles/gameMenu.css";
import { centeredTitle } from "./styles/basicStyles.css";

export const StartMenu = () => {
  return (
    <div className={menuBG}>
      <h1 className={centeredTitle}>
        Press <span className={key}>Space</span> /<br />
        <span className={key}>tap screen</span> <br />
        to start
        <br />
      </h1>
    </div>
  );
};
