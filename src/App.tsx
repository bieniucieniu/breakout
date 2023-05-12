import "./index.css";
import { Route, Switch } from "wouter";
import { BreakoutGravity } from "./components/BreakoutGravity";
import { MainMenu } from "./components/MainMenu";
import { Scoreboard } from "./components/Scoreboard";
import { centeredTitle } from "./components/styles/basicStyles.css";
import { BreakoutNormal } from "./components/BreakoutNormal";
import { ConfigEditor } from "./components/ConfigEditor";

export const App = () => {
  return (
    <Switch>
      <Route path="/" component={MainMenu} />
      <Route path="/breakoutGravity" component={BreakoutGravity} />
      <Route path="/breakoutNormal" component={BreakoutNormal} />
      <Route path="/scoreboard" component={Scoreboard} />
      <Route>
        <div className={centeredTitle}>nothing here</div>
      </Route>
    </Switch>
  );
};
