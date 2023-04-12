import { auth, db } from "./index";
import {
  Timestamp,
  addDoc,
  query,
  limit,
  orderBy,
  collection,
  type CollectionReference,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

type Data = {
  name: string;
  uid: string;
  score: number;
  date: Timestamp;
};

export const scoresCollectionRef = collection(
  db,
  "scores"
) as CollectionReference<Data>;

export const addScore = ({ score }: { score: number }) => {
  if (!auth.currentUser) return;
  if (score <= 0) return;

  addDoc(scoresCollectionRef, {
    name: auth.currentUser.displayName,
    uid: auth.currentUser.uid,
    score,
    date: Timestamp.fromDate(new Date()),
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
}) => {
  const q = query(
    scoresCollectionRef,
    orderBy(orderedBy || "score", direction || "desc"),
    limit(limitedTo || 10)
  );
  const [scores, loading, error] = useCollection(q, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  return {
    scores,
    loading,
    error,
  };
};
