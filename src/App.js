import React, { PureComponent } from "react";
import {
  ADD_PATHNAME,
  LIST_PATHNAME,
  EDIT_PATHNAME,
  DETAIL_PATHNAME,
  ADD_GROUP_PATHNAME
} from "./globals/pathNames";
import About from "./containers/About";
import ContactForm from "./containers/ContactForm";
import ContactList from "./containers/ContactList";
import ContactDetail from "./containers/ContactDetail";
import Navbar from "./containers/Navbar";
import Loader from "./containers/Loader";
import Snackbar from "./containers/Snackbar";
import GroupForm from "./containers/GroupForm";
import { Router } from "@reach/router";

class App extends PureComponent {
  render() {
    const { history, location } = this.props;
    return (
      <div className="bp3-fill" style={{ backgroundColor: '#30404d', minHeight: '100vh' }}>
        <Navbar location={location} history={history} />
        <Loader />
        <Router location={location} history={history} >
          <ContactForm path={ADD_PATHNAME} />
          <ContactList path={LIST_PATHNAME} />
          <ContactForm path={`${EDIT_PATHNAME}/:id`} />
          <ContactDetail path={`${DETAIL_PATHNAME}/:id`} />
          <GroupForm path={ADD_GROUP_PATHNAME} />
          <About default />
        </Router>
        <Snackbar />
      </div>
    );
  }
}

export default App;
