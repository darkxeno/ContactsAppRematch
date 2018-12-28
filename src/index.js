import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { RouterProvider } from 'react-router5';
import router from './router/router-config';

const Root = () => (
  <RouterProvider router={router}>
    <App router={router} />
  </RouterProvider>  
);

ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
