import { Auth } from "./Auth";
import { scoreboardNav } from "./styles/scoreboardNav.css";

export const Scoreboard = () => {
  return (
    <>
      <nav className={scoreboardNav}>
        <h1>Scoreboard</h1>
        <Auth />
      </nav>
    </>
  );
};
