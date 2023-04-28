import { formatDistance } from "date-fns";
import { Auth } from "./Auth";
import { scoreboard, scoreboardNav } from "./styles/scoreboard.css";
import { useScores } from "../firebase/scoreStorage";
import { Display } from "./Display";

export const Scoreboard = () => {
  const [data, loading, error] = useScores();

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
        {data && (
          <ol>
            {data.docs.map((e) => {
              const d = e.data();
              const date = d.timestamp?.toDate
                ? formatDistance(d.timestamp?.toDate(), new Date(), {
                    addSuffix: true,
                  })
                : "unknown";

              return (
                <li key={e.id}>
                  <span>{`${d.score ?? "0"}\t${
                    d.name ?? "unknown"
                  }\t${date}`}</span>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </>
  );
};
