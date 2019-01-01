import React from 'react';
import { Route } from 'react-router5';
import PropTypes from 'prop-types';
import ComponentSelector from './router/ComponentSelector';
import Navbar from './containers/Navbar';
import Loader from './containers/Loader';
import Snackbar from './containers/Snackbar';
import LeftMenu from './containers/Menu/LeftMenu';

function App({
  router,
  ...rest
}) {
  return (
    <div className="bp3-fill" style={{ backgroundColor: '#30404d', minHeight: '100vh' }}>
      <Route router={router}>{({ route }) => <Navbar route={route} />}</Route>
      <Loader />
      <Route router={router}>
        {({ route }) => (
          <div style={{ display: 'flex' }}>
            <LeftMenu route={route} />
            <ComponentSelector route={route} {...rest} />
          </div>
        )}
      </Route>
      <Snackbar />
    </div>
  );
}

App.propTypes = {
  router: PropTypes.object.isRequired,
};


export default App;
