import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import ContactCard from '../../components/ContactCard';
import Contacts, { actions as ContactsActions, selectors as ContactsSelectors } from '../../state/contacts';
import { actions as HistoryActions } from '../../state/history';
import { useMultiple } from '../../state/helpers/useStateProvider';

const styles = {
  contactDetailRoot: {
    margin: '0.5em 1em',
    width: '300px',
  },
};

function ContactPage(props){

  useEffect(() => {
    // Load the current contact
    ContactsActions.loadData(props.route.params.id);
  }, props.route.params.id);

  const { contacts } = useMultiple({ contacts: Contacts }, { contacts: ContactsSelectors.contactDetail }, 'ContactDetail');

  return (
    <div className={props.classes.contactDetailRoot}>
      <ContactCard
        big
        contact={contacts.current}
        loading={contacts.loading}
        onEditClick={()=>HistoryActions.transitionToEditContact(props.route.params.id)}
        onDeleteClick={()=>ContactsActions.deleteContact(props.route.params.id)}
      />
    </div>
  );
}

ContactPage.propTypes = {
  route: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(ContactPage);
