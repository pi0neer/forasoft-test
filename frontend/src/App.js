import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";
import "./App.scss";

function App() {
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
