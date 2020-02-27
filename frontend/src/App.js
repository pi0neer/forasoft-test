import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";
import "./App.scss";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/chat">
            <Chat />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
