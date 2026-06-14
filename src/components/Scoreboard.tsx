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
import { useScores, type ScoreEntry } from "../scores/storage";
import { Display } from "./Display";
import { GameTypeSelector } from "./GameTypeSelector";
import { LinkButton } from "./Buttons";

const Row = ({ score, name, timestamp, ms, index }: ScoreEntry & { index: number }) => {
  const date = formatDistance(new Date(timestamp), new Date(), {
    addSuffix: true,
  });

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

const Table = ({ scores }: { scores: ScoreEntry[] }) => {
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
  const { scores, loading, error } = useScores();

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
        <p>{error?.message ?? ""}</p>
        <Table scores={scores} />
      </div>
    </>
  );
};
