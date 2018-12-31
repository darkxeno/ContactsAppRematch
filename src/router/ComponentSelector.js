import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import About from '../containers/About';
import ContactForm from '../containers/ContactForm';
import ContactList from '../containers/ContactList';
import ContactDetail from '../containers/ContactDetail';
import GroupForm from '../containers/GroupForm';
import DrawerMenu from '../containers/Menu/DrawerMenu';
import { ROUTES } from './routes';

const styles = {
  contactDetailsLayout: {
    display: 'flex',
    flex: '1 0 auto',
  },
  editContactLayout: {
    display: 'flex',
    flex: '1 0 auto',
  },
};

function ComponentSelector({ route, router, classes }) {
  if (!route) {
    return <About route={route} />;
  }

  switch (route.name) {
    case ROUTES.ADD_GROUP:
      return <GroupForm route={route} />;
    case ROUTES.CONTACT_DETAILS:
      return (
        <div className={classes.contactDetailsLayout}>
          <ContactList route={route} />
          <DrawerMenu>
            <ContactDetail route={route} />
          </DrawerMenu>
        </div>
      );
    case ROUTES.LIST_CONTACTS:
      return <ContactList route={route} />;
    case ROUTES.ADD_CONTACT:
      return <ContactForm route={route} router={router} />;
    case ROUTES.EDIT_CONTACT:
      return (
        <div className={classes.editContactLayout}>
          <ContactList route={route} />
          <DrawerMenu>
            <ContactForm route={route} router={router} />
          </DrawerMenu>
        </div>
      );
    case ROUTES.HOME:
    default:
      return <About route={route} />;
  }
}

ComponentSelector.propTypes = {
  router: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(ComponentSelector);
