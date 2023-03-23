import { Link } from "wouter";
import { center, title } from "./styles/basicStyles.css";
import { AuthButton } from "./Auth";

export const MainMenu = () => {
  return (
    <div className={center}>
      <Link href="/breakout" className={title}>
        game
      </Link>
      <br />
      <AuthButton />
    </div>
  );
};