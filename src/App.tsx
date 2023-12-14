import "./index.css";
import { Route, Switch } from "wouter";
import { MainMenu } from "./components/MainMenu";
import { centeredTitle } from "./components/styles/basicStyles.css";
import { BreakoutNormal } from "./components/BreakoutNormal";

export const App = () => {
  return (
    <Switch>
      <Route path="/" component={MainMenu} />
      <Route path="/breakout" component={BreakoutNormal} />
      <Route>
        <div className={centeredTitle}>nothing here</div>
      </Route>
    </Switch>
  );
};
