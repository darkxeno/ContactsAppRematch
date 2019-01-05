import React from 'react';
import ReactDOM from 'react-dom';
import { StateInspector } from 'reinspect';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const Root = () => (
  <StateInspector>
    <App />
  </StateInspector>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
