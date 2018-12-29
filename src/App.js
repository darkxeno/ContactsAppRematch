import React, { PureComponent } from "react";
import { Route } from 'react-router5';
import ComponentSelector from './router/ComponentSelector';
import Navbar from "./containers/Navbar";
import Loader from "./containers/Loader";
import Snackbar from "./containers/Snackbar";
import Menu from "./containers/Menu";

class App extends PureComponent {
  render() {
    const { router } = this.props;
    const route = router.getState();
    return (
      <div className="bp3-fill" style={{ backgroundColor: '#30404d', minHeight: '100vh' }}>
        <Route router={router}>
          {({ route }) => <Navbar route={route} />}
        </Route>
        <Loader />                  
        <Route router={router}>
          {({ route }) => (
            <div style={{ display: 'flex' }}>
              <Menu route={route} />
              <ComponentSelector route={route} {...this.props} />
            </div>
          )}
        </Route>
        <Snackbar />
      </div>
    );
  }
}

export default App;
