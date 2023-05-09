import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";

import Users from "./users/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" component={Users} exact />
          <Route path="/:uid/places" component={UserPlaces} exact />
          {/* order matters when creating routes */}
          <Route path="/places/new" component={NewPlace} exact />
          <Route path="/places/:pid" component={UpdatePlace} exact />
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
