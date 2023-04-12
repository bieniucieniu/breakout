import { Auth } from "./Auth";
import { scoreboardNav } from "./styles/scoreboardNav.css";
import { useScores } from "../firebase/scoreStorage";

export const Scoreboard = () => {
  const { scores, loading, error } = useScores({});

  return (
    <>
      <nav className={scoreboardNav}>
        <h1>Scoreboard</h1>
        <Auth />
      </nav>
      <div>
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
