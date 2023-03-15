import { menuBG, key } from "./styles/gameMenu.css";
import { useEffect } from "react";
import { useStorage } from "../hooks/useStorage";
import { centeredTitle } from "./styles/basicStyles.css";

export const StartMenu = () => {
  const { setGameStage, switchPaused } = useStorage((state) => ({
    setGameStage: state.setGameStage,
    switchPaused: state.switchPaused,
  }));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " ") {
        setGameStage("playing");
        switchPaused();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={menuBG}>
      <h1 className={centeredTitle}>
        Press <span className={key}>Space</span> to start
      </h1>
    </div>
  );
};
