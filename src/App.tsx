import "./index.css";
import { Route, Router } from "wouter";
import { Breakout } from "./components/Breakout";
import { MainMenu } from "./components/MainMenu";

export const App = () => {
  return (
    <Router>
      <Route path="/" component={MainMenu} />
      <Route path="/game" component={Breakout} />
    </Router>
  );
};
