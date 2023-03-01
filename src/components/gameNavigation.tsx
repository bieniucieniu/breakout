import { useState } from "react";
import { useStorage } from "./hooks/useStorage";

const Button = ({
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
      style={{
        borderStyle: "inset",
        borderColor: "white",
        borderWidth: "0.3rem",
        height: "100%",
        width: "100%",
        zIndex: hover ? 1 : 0,
        transform: hover ? "scale(1.01)" : "scale(1)",
        transition: "transform 0s",
        ...style,
      }}
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
    <div
      style={{
        borderStyle: "inset",
        borderColor: "white",
        backgroundColor: "white",
        borderWidth: "0.3rem",
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {name}
      {name && " : "}
      {value}
    </div>
  );
};
export const GameNavigation = ({ style }: { style?: React.CSSProperties }) => {
  const { paused, switchPaused, score } = useStorage((state) => ({
    paused: state.paused,
    switchPaused: state.switchPaused,
    score: state.score,
  }));
  return (
    <nav
      style={{
        borderWidth: ".4rem",
        borderStyle: "outset",
        backgroundColor: "blue",
        borderColor: "blue",
        margin: ".3rem",
        display: "grid",
        alignItems: "center",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: ".5rem",
        padding: ".3rem",
        ...style,
      }}
    >
      <Button />
      <ValueDisplay name="score" value={score} />
      <ValueDisplay />

      <Button
        // onClick={() => setPaused(!paused)}
        onClick={switchPaused}
        name={paused ? "start" : "stop"}
      />
    </nav>
  );
};
