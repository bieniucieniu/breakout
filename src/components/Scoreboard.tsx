import { formatDistance } from "date-fns";
import { Auth } from "./Auth";
import {
  scoreboard,
  scoreboardNav,
  table,
  row,
  cell,
  tableHeader,
  tableContainer,
} from "./styles/scoreboard.css";
import { msToTime } from "../functions/timer";
import { useScores, type Data } from "../firebase/scoreStorage";
import { Display } from "./Display";
import { GameTypeSelector } from "./GameTypeSelector";
import { useMemo } from "react";
import { LinkButton } from "./Buttons";

const Row = ({
  score,
  name,
  timestamp,
  ms,
  index,
}: Data & { index: number }) => {
  const date = timestamp?.toDate
    ? formatDistance(timestamp.toDate(), new Date(), {
        addSuffix: true,
      })
    : "unknown";

  return (
    <li className={row}>
      <span className={cell}>{index + 1}</span>
      <span className={cell}>{name}</span>
      <span className={cell}>{score}</span>
      <span className={cell}>{date}</span>
      <span className={cell}>{msToTime(ms)}</span>
    </li>
  );
};

const Table = ({ scores }: { scores: (Data & { id: string })[] }) => {
  return (
    <div className={tableContainer}>
      <ol className={table}>
        <li className={tableHeader}>
          <span className={cell}>#</span>
          <span className={cell}>Name</span>
          <span className={cell}>Score</span>
          <span className={cell}>Date</span>
          <span className={cell}>Time</span>
        </li>
        {scores.map((score, i) => (
          <Row key={score.id} {...score} index={i} />
        ))}
      </ol>
    </div>
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
        <Display>
          <Auth />
        </Display>
        <Display>
          <GameTypeSelector />
        </Display>
        <LinkButton href="/">back</LinkButton>
      </nav>

      <div className={scoreboard}>
        <h1>Leaderboard</h1>
        <p>{loading ? "Loading..." : ""}</p>
        <p>{error ? error.message : ""}</p>
        <Table scores={data} />
      </div>
    </>
  );
};
