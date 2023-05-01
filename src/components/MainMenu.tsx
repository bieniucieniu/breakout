import { Link } from "wouter";
import { title } from "./styles/basicStyles.css";
import { Auth } from "./Auth";
import { mainMenu } from "./styles/mainMenu.css";

export const MainMenu = () => {
  return (
    <div className={mainMenu}>
      <Link href="/breakoutNormal" className={title}>
        game
      </Link>
      <Link href="/breakout" className={title}>
        game w gravity
      </Link>
      <Link href="/scoreboard" className={title}>
        scoreboard
      </Link>
      <Auth />
    </div>
  );
};
