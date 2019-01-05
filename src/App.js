import React from 'react';
import ComponentSelector from './router/ComponentSelector';
import Navbar from './containers/Navbar';
import Loader from './containers/Loader';
import Snackbar from './containers/Snackbar';
import LeftMenu from './containers/Menu/LeftMenu';
import History from './state/history';
import { useMultiple } from './state/helpers/useStateProvider';

function App({
  ...rest
}) {
  const { history: { route } } = useMultiple({ history: History }, undefined, 'App');
  return (
    <div className="bp3-fill" style={{ backgroundColor: '#30404d', minHeight: '100vh' }}>
      <Navbar route={route} />
      <Loader />
      <div style={{ display: 'flex' }}>
        <LeftMenu route={route} />
        <ComponentSelector route={route} {...rest} />
      </div>
      <Snackbar />
    </div>
  );
}

App.propTypes = {

};


export default App;
