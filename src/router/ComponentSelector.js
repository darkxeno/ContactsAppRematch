import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import About from '../section-components/About/About';
import ContactForm from '../section-components/ContactForm/ContactForm';
import ContactList from '../section-components/ContactList/ContactList';
import ContactDetail from '../section-components/ContactDetail/ContactDetail';
import GroupForm from '../section-components/GroupForm/GroupForm';
import DrawerMenu from '../section-components/Menu/DrawerMenu';
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

function ComponentSelector({ route, classes }) {
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
      return <ContactForm route={route} />;
    case ROUTES.EDIT_CONTACT:
      return (
        <div className={classes.editContactLayout}>
          <ContactList route={route} />
          <DrawerMenu>
            <ContactForm route={route} />
          </DrawerMenu>
        </div>
      );
    case ROUTES.HOME:
    default:
      return <About route={route} />;
  }
}

ComponentSelector.propTypes = {
  route: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(ComponentSelector);
