import { Link } from "wouter";
import { center, title } from "./styles/basicStyles.css";
import { Auth } from "./Auth";

export const MainMenu = () => {
  return (
    <div className={center}>
      <Link href="/game" className={title}>
        game
      </Link>
      <br />
      <Auth />
    </div>
  );
};
