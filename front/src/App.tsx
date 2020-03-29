import * as React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Games from "./views/Games";

class App extends React.Component {
  public render() {
    return (
      <Router>
        <Route exact={true} path="/" component={Games} />
      </Router>
    );
  }
}

export default App;
