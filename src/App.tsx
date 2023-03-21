import "./index.css";
import { Route, Switch } from "wouter";
import { Breakout } from "./components/Breakout";
import { MainMenu } from "./components/MainMenu";
import { Scoreboard } from "./components/Scoreboard";
import { centeredTitle } from "./components/styles/basicStyles.css";

export const App = () => {
  return (
    <Switch>
      <Route path="/" component={MainMenu} />
      <Route path="/game" component={Breakout} />
      <Route path="/scoreboard" component={Scoreboard} />
      <Route>
        <div className={centeredTitle}>nothing here</div>
      </Route>
    </Switch>
  );
};
