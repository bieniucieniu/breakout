import "./index.css";
import { Route, Switch } from "wouter";
import MainMenu from "@/components/MainMenu";
import { centeredTitle } from "@/styles/basicStyles.css";
import Breakout from "@/components/Breakout";

export const App = () => {
  return (
    <Switch>
      <Route path="/" component={MainMenu} />
      <Route path="/breakout" component={Breakout} />
      <Route>
        <div className={centeredTitle}>nothing here</div>
      </Route>
    </Switch>
  );
};
