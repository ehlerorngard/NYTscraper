import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./panels/Articles";
import Detail from "./panels/Detail";
import NoMatch from "./panels/NoMatch";
import Nav from "./components/Nav";

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Articles} />
        <Route exact path="/articles" component={Articles} />
        <Route exact path="/articles/:id" component={Detail} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
