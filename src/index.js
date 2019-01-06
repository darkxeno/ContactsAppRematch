import React from 'react';
import ReactDOM from 'react-dom';
import { StateInspector } from 'reinspect';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let Root;

// enabling redux-tools
// eslint-disable-next-line no-underscore-dangle
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  Root = () => (
    <StateInspector>
      <App />
    </StateInspector>
  );
} else {
  Root = () => (
    <App />
  );
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
