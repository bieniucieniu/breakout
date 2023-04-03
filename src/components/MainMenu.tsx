import { Link } from "wouter";
import { center, title } from "./styles/basicStyles.css";
import { Auth } from "./Auth";
import { auth } from "./styles/auth.css";

export const MainMenu = () => {
  console.log(auth);
  return (
    <div className={center}>
      <Link href="/breakout" className={title}>
        game
      </Link>
      <br />
      <Auth className={auth} />
    </div>
  );
};
