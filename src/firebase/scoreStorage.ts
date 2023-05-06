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
};

const collectionsRefs = {
  classic: collection(db, "scores-classic") as CollectionReference<Data>,
  time: collection(db, "scores-time") as CollectionReference<Data>,
  gravity: collection(db, "scores-gravity") as CollectionReference<Data>,
};

export const addScore = ({ score }: { score: number }) => {
  if (!auth.currentUser) return;
  if (score <= 0) return;
  const gameType = useStorage.getState().gameType;
  const ref = collectionsRefs[gameType];

  addDoc(ref, {
    name: auth.currentUser.displayName,
    uid: auth.currentUser.uid,
    score,
    timestamp: serverTimestamp(),
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
    collectionsRefs[gameType],
    orderBy(orderedBy || "score", direction || "desc"),
    limit(limitedTo || 10)
  );

  return useCollection(q, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
};
