import React, { PureComponent } from "react";
import { Route } from 'react-router5';
import ComponentSelector from './ComponentSelector';
import Navbar from "./containers/Navbar";
import Loader from "./containers/Loader";
import Snackbar from "./containers/Snackbar";

class App extends PureComponent {
  render() {
    const { router } = this.props;

    return (
      <div className="bp3-fill" style={{ backgroundColor: '#30404d', minHeight: '100vh' }}>
        <Navbar route={router.getState()} />
        <Loader />
        <Route router={router}>
          {({ route }) => <ComponentSelector route={route} {...this.props} />}
        </Route>
        <Snackbar />
      </div>
    );
  }
}

export default App;
