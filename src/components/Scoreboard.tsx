import { formatDistance } from "date-fns";
import { Auth } from "./Auth";
import { scoreboard, scoreboardNav, table } from "./styles/scoreboard.css";
import { useScores, type Data } from "../firebase/scoreStorage";
import { Display } from "./Display";
import { GameTypeSelector } from "./GameTypeSelector";
import { useMemo } from "react";
import { LinkButton } from "./Buttons";

const Row = ({ score, name, timestamp }: Data) => {
  const date = timestamp?.toDate
    ? formatDistance(timestamp.toDate(), new Date(), {
        addSuffix: true,
      })
    : "unknown";

  return (
    <li>
      <span>{name}</span>
      <span>{score}</span>
      <span>{date}</span>
    </li>
  );
};

const Table = ({ scores }: { scores: (Data & { id: string })[] }) => {
  return (
    <ol className={table}>
      {scores.map((score) => (
        <Row key={score.id} {...score} />
      ))}
    </ol>
  );
};

export const Scoreboard = () => {
  const [snap, loading, error] = useScores();

  const data = useMemo(
    () => snap?.docs.map((doc) => ({ ...doc.data(), id: doc.id })) ?? [],
    [snap]
  );

  return (
    <>
      <nav className={scoreboardNav}>
        <Display>Scoreboard</Display>
        <Display>
          <Auth />
        </Display>
        <Display>
          <GameTypeSelector />
        </Display>
        <LinkButton href="/">back</LinkButton>
      </nav>

      <div className={scoreboard}>
        <h2>Leaderboard</h2>
        <p>{loading ? "Loading..." : ""}</p>
        {error && <p>Error: {error.message}</p>}
        <Table scores={data} />
      </div>
    </>
  );
};
