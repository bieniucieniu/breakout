import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJeF_fin_zPcrxK6RWmu_BcJ2xTp19Pn8",
  authDomain: "breakout-32604.firebaseapp.com",
  projectId: "breakout-32604",
  storageBucket: "breakout-32604.appspot.com",
  messagingSenderId: "528439443559",
  appId: "1:528439443559:web:47fe38c6c3427b23f094c2",
  measurementId: "G-T4N4VR9CTK",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const scoresCollection = collection(db, "scores");

export const addScore = ({ score }: { score: number }) => {
  if (!auth.currentUser) return;
  if (score <= 0) return;

  addDoc(scoresCollection, {
    name: auth.currentUser.displayName,
    uid: auth.currentUser.uid,
    score,
    date: Date.now(),
  });
};
