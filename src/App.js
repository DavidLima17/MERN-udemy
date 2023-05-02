import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";

import Users from "./users/pages/Users";
import NewPlace from "./places/pages/NewPlace";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Users} exact></Route>
        <Route path="/places/new" component={NewPlace} exact></Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
