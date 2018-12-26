import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Location } from "@reach/router";

const Root = () => (
  <Location>
    {props => <App location={props.location} />}
  </Location>
);

ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
