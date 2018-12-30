import React, { useEffect, useState } from 'react';
import posed, { PoseGroup } from 'react-pose';
import { Subscribe } from 'bey';
import { Button } from '@blueprintjs/core';
import ContactCard from '../../components/ContactCard';
import ContactsState from '../../state/contacts/';
import GlobalState from '../../state/global/';
import { actions } from '../../state/history/';


function addHandlers(props) {
  return {
    ...props,
    ...actions,
  };
}

function ContactListCards(props) {
  return props.list.map((contact) => (
    <ContactCard
      key={`contact-${contact.id}`}
      contact={contact}
      onEditClick={() => props.transitionToEditContact(contact.id)}
      onDeleteClick={() => ContactsState.actions.deleteContact(contact.id)}
    />
  ));
}

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

function ContactListItems(props) {
  return (
    <PoseGroup>
      {props.list.map((contact, i) => (
        <Item key={`contact-${contact.id}`} id={contact.id} i={i}>
          <div
            onClick={() => props.transitionToContactDetail(contact.id)}
            className={`bp3-tag bp3-interactive contact-list-item ${
              props.route.params.id === contact.id ? 'selected' : ''
            }`}
          >
            <div style={{ display: 'flex' }}>
              {contact.imgUrl ? (
                <Pop>
                  <img
                    src={contact.imgUrl}
                    alt={contact.name}
                    style={{
                      maxWidth: 50,
                      minWidth: 50,
                      maxHeight: 50,
                    }}
                  />
                </Pop>
              ) : (
                <Pop className="avatar">{contact.name.substring(0, 1).toUpperCase()}</Pop>
              )}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignSelf: 'center',
                  marginLeft: '2rem',
                }}
              >
                <div style={{ fontWeight: 'bolder' }}>{contact.name}</div>
                <div style={{ fontSize: '12px' }}>{contact.groupNames || 'Without group'}</div>
              </div>
            </div>
            <Pop>
              <Button
                icon="delete"
                onClick={() => ContactsState.actions.deleteContact(contact.id)}
              />
            </Pop>
          </div>
        </Item>
      ))}
    </PoseGroup>
  );
}

export default function ContactList(props) {
  const [global, setGlobal] = useState(GlobalState.state.get());

  function handler() {
    const newMode = GlobalState.state.get().mode;
    if (newMode !== global.mode) {
      setGlobal(GlobalState.state.get());
    }
  }

  useEffect(() => {
    // Load the contact list
    ContactsState.actions.loadData();
  });

  useEffect(() => {
    GlobalState.state.on(handler);
    return function cleanup() {
      GlobalState.state.off(handler);
    };
  });

  return (
    <div
      style={{
        margin: '0.2em 0 0 0', display: 'flex', flex: '1 0 auto', flexDirection: 'row',
      }}
    >
      <Subscribe to={ContactsState.state} on={(state) => state.list}>
        {(contactList) => global.mode === 'list' ? (
          <div
            style={{
              display: 'flex',
              flex: '1 0 auto',
              flexDirection: 'column',
            }}
          >
            <ContactListItems {...addHandlers(props)} list={Object.values(contactList)} />
          </div>
        ) : (
          <div
            style={{
              flexWrap: 'wrap',
            }}
          >
            <ContactListCards {...addHandlers(props)} list={Object.values(contactList)} />
          </div>
        )}
      </Subscribe>
    </div>
  );
}
