import { Breakout } from "./components/Breakout";
import "./index.css";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDJeF_fin_zPcrxK6RWmu_BcJ2xTp19Pn8",
  authDomain: "breakout-32604.firebaseapp.com",
  projectId: "breakout-32604",
  storageBucket: "breakout-32604.appspot.com",
  messagingSenderId: "528439443559",
  appId: "1:528439443559:web:47fe38c6c3427b23f094c2",
  measurementId: "G-T4N4VR9CTK",
};

const firebase = initializeApp(firebaseConfig);

export const App = () => {
  return (
    <>
      <Breakout />
    </>
  );
};
