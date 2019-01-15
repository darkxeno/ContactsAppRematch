import React from 'react';
import ComponentSelector from './router/ComponentSelector';
import Navbar from './section-components/Navbar/Navbar';
import Loader from './section-components/Loader/Loader';
import Snackbar from './section-components/Snackbar/Snackbar';
import LeftMenu from './section-components/Menu/LeftMenu';
import History from './state/history';
import { useMultipleStates } from './state/helpers/useStateProvider';

function App({
  ...rest
}) {
  const { history: { route } } = useMultipleStates('App', { history: History });
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
