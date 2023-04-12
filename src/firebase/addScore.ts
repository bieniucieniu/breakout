import { Timestamp, addDoc } from "firebase/firestore";
import { auth, scoresCollectionRef } from "./index";

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
