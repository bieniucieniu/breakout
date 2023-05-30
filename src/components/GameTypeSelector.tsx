import React from "react";
import { useStorage } from "../storage";
import { Button } from "./Buttons";
import { gameTypeButtons, gameTypeButton } from "./styles/gameTypeSelector.css";

export const GameTypeSelector = ({
  className,
  ...props
}: React.HTMLProps<HTMLDivElement>) => {
  const setGameType = useStorage((state) => state.setGameType);
  const gameType = useStorage((state) => state.gameType);
  return (
    <div className={`${gameTypeButtons} ${className}`} {...props}>
      <Button
        onClick={() => setGameType("classic")}
        disabled={gameType === "classic"}
        className={gameTypeButton}
      >
        classic
      </Button>
      <Button
        onClick={() => setGameType("gravity")}
        disabled={gameType === "gravity"}
        className={gameTypeButton}
      >
        gravity
      </Button>
      <Button
        onClick={() => setGameType("time")}
        disabled={gameType === "time"}
        className={gameTypeButton}
      >
        time
      </Button>
    </div>
  );
};
