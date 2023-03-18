import { menuBG, key } from "./styles/gameMenu.css";
import { centeredTitle } from "./styles/basicStyles.css";

export const StartMenu = () => {
  return (
    <div className={menuBG}>
      <h1 className={centeredTitle}>
        Press <span className={key}>Space</span> /{" "}
        <span className={key}>tap screen</span> to start
        <br />
      </h1>
    </div>
  );
};
