import React, { useCallback } from 'react';
import posed, { PoseGroup } from 'react-pose';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Button } from '@blueprintjs/core';
import ContactCard from '../../reusable-components/ContactCard';
import { useMultipleStates } from '../../state/helpers/useStateProvider';
import Contacts, { actions as ContactsActions, selectors as ContactsSelectors } from '../../state/contacts';
import Global from '../../state/global';
import { actions as HistoryActions } from '../../state/history';
import ContactTable from './ContactTable';

const styles = {
  contactListItem: {
    '&.bp3-tag.bp3-interactive': {
      display: 'flex',
      justifyContent: 'space-between',
      height: '60px',
      paddingLeft: '8px',
      margin: '3px',
      backgroundColor: '#394b59',
      color: 'white',
      boxShadow: '0 0 0 1px rgba(16, 22, 26, 0.2), 0 0 0 rgba(16, 22, 26, 0), 0 1px 1px rgba(16, 22, 26, 0.4)',
    },
    '&.bp3-tag.bp3-interactive:hover': {
      background: '#202B33',
    },
    '&.bp3-tag.bp3-interactive.selected': {
      background: '#5C7080',
    },
  },
  contactListItemImage: {
    maxWidth: 50,
    minWidth: 50,
    maxHeight: 50,
  },
  contactListItemTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    marginLeft: '2rem',
  },
  contactListItemText1stLine: {
    fontWeight: 'bolder',
  },
  contactListItemText2ndLine: {
    fontSize: '12px',
  },
  contactListItemAvatar: {
    width: '50px',
    height: '50px',
    fontSize: '35px',
    backgroundColor: '#182026',
    color: 'white',
    textAlign: 'center',
    lineHeight: '50px',
    borderRadius: '50px',
  },
  contactListRoot: {
    display: 'flex',
    flex: '1 0 auto',
    flexDirection: 'row',
    height: 'calc(100vh - 3.7em)',
    overflowY: 'scroll',
  },
  contactListItemsContainer: {
    display: 'flex',
    flex: '1 0 auto',
    flexDirection: 'column',
  },
  contactListCardsContainer: {
    flexWrap: 'wrap',
  },
};

const Pop = posed.div({
  hoverable: true,
  init: { scale: 1 },
  hover: { scale: 1.2 },
});

const Item = posed.div({
  enter: {
    opacity: 1,
    transition: ({ i }) => ({ delay: i * 50 }),
  },
  exit: { opacity: 0 },
  props: { i: 0 },
});

function ContactListCards(props) {
  return props.list.map((contact) => (
    <ContactCard
      key={`contact-${contact.id}`}
      contact={contact}
      onEditClick={() => HistoryActions.transitionToEditContact({ id: contact.id })}
      onDeleteClick={() => ContactsActions.deleteContact(contact.id)}
    />
  ));
}

function ContactListItems({
  classes, list, route,
}) {
  return (
    <PoseGroup>
      {list.map((contact, i) => (
        <Item key={`contact-${contact.id}`} id={contact.id} i={i}>
          <div
            role="presentation"
            onKeyPress={(e) => (e.key === 'Enter') ? HistoryActions.transitionToContactDetail({ id: contact.id }) : false}
            onClick={() => HistoryActions.transitionToContactDetail({ id: contact.id })}
            className={`bp3-tag bp3-interactive ${classes.contactListItem} ${
              route.params.id === contact.id ? 'selected' : ''
            }`}
          >
            <div style={{ display: 'flex' }}>
              {contact.imgUrl ? (
                <Pop>
                  <img
                    src={contact.imgUrl}
                    alt={contact.name}
                    className={classes.contactListItemImage}
                  />
                </Pop>
              ) : (
                <Pop className={classes.contactListItemAvatar}>
                  { contact.name.substring(0, 1).toUpperCase() }
                </Pop>
              )}
              <div className={classes.contactListItemTextContainer}>
                <div className={classes.contactListItemText1stLine}>{contact.name}</div>
                <div className={classes.contactListItemText2ndLine}>{contact.groupNames || 'Without group'}</div>
              </div>
            </div>
            <Pop>
              <Button
                icon="delete"
                onClick={(e) => {
                  ContactsActions.deleteContact(contact.id);
                  e.stopPropagation();
                }}
              />
            </Pop>
          </div>
        </Item>
      ))}
    </PoseGroup>
  );
}

const ContactList = React.memo((props) => {
  const { contacts, global } = useMultipleStates('ContactList', {
    contacts: Contacts,
    global: Global,
  }, {
    contacts: ContactsSelectors.contactList,
    global: ContactsSelectors.contactListGlobal,
  });

  const renderListType = useCallback(() => {
    switch (global.mode) {
      case 'list':
        return (
          <div className={props.classes.contactListItemsContainer}>
            <ContactListItems {...props} list={Object.values(contacts.list)} />
          </div>
        );
      case 'card':
        return (
          <div className={props.classes.contactListCardsContainer}>
            <ContactListCards {...props} list={Object.values(contacts.list)} />
          </div>
        );
      default:
        return (
          <div className={props.classes.contactListItemsContainer}>
            <ContactTable {...props} list={Object.values(contacts.list)} />
          </div>
        );
    }
  });

  return (
    <div className={props.classes.contactListRoot}>
      {renderListType()}
    </div>
  );
});

ContactListCards.propTypes = {
  list: PropTypes.array.isRequired,
  route: PropTypes.object.isRequired,
};

ContactListItems.propTypes = {
  list: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

ContactList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(ContactList);
