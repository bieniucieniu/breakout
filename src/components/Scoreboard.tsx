import { Auth } from "./Auth";
import { scoreboard, scoreboardNav } from "./styles/scoreboard.css";
import { useScores } from "../firebase/scoreStorage";
import { Display } from "./Display";

export const Scoreboard = () => {
  const { scores, loading, error } = useScores();

  return (
    <>
      <nav className={scoreboardNav}>
        <Display>Scoreboard</Display>
        <Display>
          <Auth />
        </Display>
      </nav>
      <div className={scoreboard}>
        <h2>Leaderboard</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {scores && (
          <ol>
            {scores.docs.map((score) => {
              const s = score.data();
              return (
                <li key={score.id}>
                  <span>{`${s.score}\t${s.name}\t${s.date.toDate()}`}</span>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </>
  );
};
