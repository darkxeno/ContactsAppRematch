import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router5';
import { StateInspector } from 'reinspect';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import router from './router/router-config';


const Root = () => (
  <StateInspector>
    <RouterProvider router={router}>
      <App router={router} />
    </RouterProvider>
  </StateInspector>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
