import { useEffect, useState } from "react";
import { useStorage } from "../storage";
import { getStoredUser } from "../auth/user";

export type ScoreEntry = {
  id: string;
  name: string;
  uid: string;
  score: number;
  timestamp: number;
  gameType: "classic" | "time" | "gravity";
  ms: number;
};

const scoresKey = (gameType: ScoreEntry["gameType"]) => `breakout-scores-${gameType}`;

const readScores = (gameType: ScoreEntry["gameType"]): ScoreEntry[] => {
  const raw = localStorage.getItem(scoresKey(gameType));
  if (!raw) return [];

  try {
    return JSON.parse(raw) as ScoreEntry[];
  } catch {
    localStorage.removeItem(scoresKey(gameType));
    return [];
  }
};

const writeScores = (gameType: ScoreEntry["gameType"], scores: ScoreEntry[]) => {
  localStorage.setItem(scoresKey(gameType), JSON.stringify(scores));
};

export const addScore = ({
  score,
  gameType,
  ms,
}: {
  score: number;
  gameType: ScoreEntry["gameType"];
  ms: number;
}) => {
  const user = getStoredUser();
  if (!user || score <= 0) return;

  const entry: ScoreEntry = {
    id: crypto.randomUUID(),
    name: user.name,
    uid: user.uid,
    score,
    timestamp: Date.now(),
    gameType,
    ms,
  };

  const scores = [...readScores(gameType), entry];
  writeScores(gameType, scores);
  window.dispatchEvent(new CustomEvent("breakout-scores-updated", { detail: { gameType } }));
};

export const getScores = ({
  gameType,
  orderedBy = "score",
  direction = "desc",
  limitedTo = 10,
}: {
  gameType: ScoreEntry["gameType"];
  orderedBy?: "score" | "date" | "name";
  direction?: "asc" | "desc";
  limitedTo?: number;
}) => {
  const sortKey = orderedBy === "date" ? "timestamp" : orderedBy === "name" ? "name" : "score";

  return readScores(gameType)
    .sort((a, b) => {
      const left = a[sortKey];
      const right = b[sortKey];

      if (typeof left === "number" && typeof right === "number") {
        return direction === "asc" ? left - right : right - left;
      }

      return direction === "asc"
        ? String(left).localeCompare(String(right))
        : String(right).localeCompare(String(left));
    })
    .slice(0, limitedTo);
};

export const useScores = ({
  orderedBy,
  direction,
  limitedTo,
}: {
  orderedBy?: "score" | "date" | "name";
  direction?: "asc" | "desc";
  limitedTo?: number;
} = {}) => {
  const gameType = useStorage((state) => state.gameType);
  const [scores, setScores] = useState<ScoreEntry[]>(() =>
    getScores({ gameType, orderedBy, direction, limitedTo }),
  );

  useEffect(() => {
    const refresh = () => {
      setScores(getScores({ gameType, orderedBy, direction, limitedTo }));
    };

    refresh();

    const onUpdate = (event: Event) => {
      const detail = (event as CustomEvent<{ gameType: ScoreEntry["gameType"] }>).detail;
      if (!detail || detail.gameType === gameType) {
        refresh();
      }
    };

    window.addEventListener("breakout-scores-updated", onUpdate);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener("breakout-scores-updated", onUpdate);
      window.removeEventListener("storage", refresh);
    };
  }, [gameType, orderedBy, direction, limitedTo]);

  return { scores, loading: false, error: null as Error | null };
};
