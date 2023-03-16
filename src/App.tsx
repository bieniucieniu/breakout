import "./index.css";
import { initializeApp } from "firebase/app";
import { Link, Route, Router } from "wouter";
import { Breakout } from "./components/Breakout";
import { centeredTitle } from "./components/styles/basicStyles.css";

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
    <Router>
      <Route path="/">
        <Link href="/game" className={centeredTitle}>
          game
        </Link>
      </Route>
      <Route path="/game" component={Breakout} />
    </Router>
  );
};
