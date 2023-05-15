import { auth, db } from "./index";
import {
  addDoc,
  query,
  limit,
  orderBy,
  collection,
  serverTimestamp,
  type Timestamp,
  type CollectionReference,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useStorage } from "../storage";

type Data = {
  name: string;
  uid: string;
  score: number;
  timestamp: Timestamp;
  gameType: "classic" | "time" | "gravity";
  ms: number;
};

export const addScore = ({
  score,
  gameType,
  ms,
}: {
  score: number;
  gameType: "classic" | "time" | "gravity";
  ms: number;
}) => {
  if (!auth.currentUser || score <= 0) return;

  const ref = collection(db, `scores-${gameType}`) as CollectionReference<Data>;
  addDoc(ref, {
    name: auth.currentUser.displayName || "ku*wa wroclawska",
    gameType,
    uid: auth.currentUser.uid,
    score,
    timestamp: serverTimestamp(),
    ms,
  });
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

  const q = query(
    collection(db, `scores-${gameType}`) as CollectionReference<Data>,
    orderBy(orderedBy || "score", direction || "desc"),
    limit(limitedTo || 10)
  );

  return useCollection(q, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
};
