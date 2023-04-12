import { Link } from "wouter";
import { center, title } from "./styles/basicStyles.css";
import { Auth } from "./Auth";

export const MainMenu = () => {
  return (
    <div className={center}>
      <Link href="/breakout" className={title}>
        game
      </Link>
      <Link href="/scoreboard" className={title}>
        scoreboard
      </Link>
      <br />
      <Auth />
    </div>
  );
};
