import { menuBG, key } from "./styles/gameMenu.css";
import { centeredTitle } from "./styles/basicStyles.css";
import type { KeyboardEvent } from "react";

export const StartMenu = () => {
  return (
    <div className={menuBG}>
      <h1 className={centeredTitle}>
        Press <span className={key}>Space</span> or{" "}
        <span className={key}>Esc</span> to start
      </h1>
    </div>
  );
};
