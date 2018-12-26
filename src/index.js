import React from "react";
import ReactDOM from "react-dom";
import { Router, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { HOME_PATHNAME } from "./globals/pathNames";
import { history } from "./state/history/"

const Root = () => (
  <Router history={history}>
    <Route path={HOME_PATHNAME} component={App} />
  </Router>
);

ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
