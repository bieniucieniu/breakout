import { useEffect, useState } from "react";
import { useStorage } from "./hooks/useStorage";
import { button, valueDisplay, navbar } from "./styles/navbar.css";

export const Button = ({
  style,
  name,
  onClick,
}: {
  name?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) => {
  const [hover, setHover] = useState(false);

  return (
    <button
      className={button}
      onClick={onClick}
      onMouseOver={(e) => {
        setHover(true);
      }}
      onMouseLeave={(e) => {
        setHover(false);
      }}
    >
      {name}
    </button>
  );
};

export const ValueDisplay = ({
  name,
  value,
}: {
  name?: string;
  value?: number;
}) => {
  return (
    <div className={valueDisplay}>
      {name}
      {name && " : "}
      {value}
    </div>
  );
};
export const GameNavigation = () => {
  const paused = useStorage((state) => state.paused);
  const switchPaused = useStorage((state) => state.switchPaused);
  const score = useStorage((state) => state.score);
  const lifes = useStorage((state) => state.lifes);
  const setGame = useStorage((state) => state.setGame);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => e.key === " " && switchPaused();
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <nav className={navbar}>
      <Button onClick={switchPaused} name={paused ? "start" : "stop"} />
      <ValueDisplay name="score" value={score} />
      <ValueDisplay name="lifes" value={lifes} />
      <Button name="resetgame" onClick={setGame} />
    </nav>
  );
};
