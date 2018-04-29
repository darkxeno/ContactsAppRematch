import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import "./index.css";
import App from "./App";
import store from "./storeConf";
import registerServiceWorker from "./registerServiceWorker";
import { HOME_PATHNAME } from "./globals/pathNames";

const Root = () => (
  <Provider store={store}>
    <MuiThemeProvider>
    <Router>
      <Route path={HOME_PATHNAME} component={App} />
    </Router>
    </MuiThemeProvider>
  </Provider>
);
ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
