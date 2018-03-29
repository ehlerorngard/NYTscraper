import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Articles from "./panels/Articles";
import Nav from "./components/Nav";

const App = () => (
  // <Router>
    <div>
      <Nav />
      <Articles />
    </div>
  // </Router>
);

export default App;
