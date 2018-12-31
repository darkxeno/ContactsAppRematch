import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router5';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import router from './router/router-config';

const Root = () => (
  <RouterProvider router={router}>
    <App router={router} />
  </RouterProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
