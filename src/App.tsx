import "./index.css";
import { Route, Router } from "wouter";
import { Breakout } from "./components/Breakout";
import { MainMenu } from "./components/MainMenu";
import { DB } from "./components/DB";

export const App = () => {
  return (
    <Router>
      <Route path="/" component={MainMenu} />
      <Route path="/game" component={Breakout} />
      <Route path="/db" component={DB} />
    </Router>
  );
};
