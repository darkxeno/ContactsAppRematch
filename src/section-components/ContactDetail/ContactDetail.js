import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import ContactCard from '../../reusable-components/ContactCard';
import Contacts, { actions as ContactsActions, selectors as ContactsSelectors } from '../../state/contacts';
import { actions as HistoryActions } from '../../state/history';
import { useMultipleStates } from '../../state/helpers/useStateProvider';

const styles = {
  contactDetailRoot: {
    margin: '0.5em 1em',
    width: '300px',
  },
};

function ContactPage(props) {
  const { contacts } = useMultipleStates('ContactDetail', { contacts: Contacts }, { contacts: ContactsSelectors.contactDetail });

  return (
    <div className={props.classes.contactDetailRoot}>
      <ContactCard
        big
        contact={contacts.current}
        loading={contacts.loading}
        onEditClick={() => HistoryActions.transitionToEditContact(props.route.params)}
        onDeleteClick={() => ContactsActions.deleteContact(props.route.params.id)}
      />
    </div>
  );
}

ContactPage.propTypes = {
  route: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(ContactPage);
