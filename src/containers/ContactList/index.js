import { useEffect, default as React } from "react";
import PropTypes from "prop-types";
import List from "material-ui/List";
import ListItem from "material-ui/List/ListItem";
import Avatar from "material-ui/Avatar";
import Divider from "material-ui/Divider";
import Subheader from "material-ui/Subheader";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui/svg-icons/action/delete";
import ContactCard from "../../components/ContactCard";
import { LIST_MODE } from "../../models/contactList/constants";
import { EDIT_PATHNAME, DETAIL_PATHNAME } from "../../globals/pathNames";
import { Subscribe } from 'bey';
import ContactsState from '../../state/contacts/';

function addHandlers(props){
  return { 
    ...props, 
    transitionToEditContact: (id) =>
      props.history.push(`${EDIT_PATHNAME}/${id}`),
    transitionToContactDetail: (id) =>
      props.history.push(`${DETAIL_PATHNAME}/${id}`),
  };
}


function ContactListCards(props){
  return props.list.map(contact => (
    <ContactCard
      key={`contact-${contact.id}`}
      contact={contact}
      onEditClick={() => props.transitionToEditContact(contact.id)}
      onDeleteClick={() => ContactsState.actions.deleteContact(contact.id)}
    />
  ));
}


function ContactListItems(props){
  console.log('ContactListItems props',props);
  return props.list.map(contact => 
    <div key={`contact-${contact.id}`}>
      <ListItem
        leftAvatar={
          contact.imgUrl ? (
            <Avatar src={contact.imgUrl} />
          ) : (
            <Avatar>{contact.name.substring(0, 1)}</Avatar>
          )
        }
        primaryText={contact.name}
        secondaryText={contact.groupNames || "Without group"}
        secondaryTextLines={1}
        onClick={() => props.transitionToContactDetail(contact.id)}
        rightIconButton={
          <IconButton>
            <DeleteIcon onClick={() => ContactsState.actions.deleteContact(contact.id)} />
          </IconButton>
        }
      />
      <Divider key={`divider-${contact.id}`} inset />
    </div>
  );
}

export default function ContactList(props){

  useEffect(() => {
    // Load the contact list
    ContactsState.actions.loadData();
  });  
  
  return (
    <div style={{ margin: "0.2em 0 0 0" }}>
      <Subscribe to={ContactsState.state}>
        {contacts => {return (
          (contacts.mode===LIST_MODE)?
          <List>
            <div style={{
              boxSizing: "border-box",
              color: "rgba(0, 0, 0, 0.54)",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "48px",
              paddingLeft: "16px",
              width: "100%"
            }}>
              Contacts
            </div>
            <ContactListItems {...addHandlers(props)} list={Object.values(contacts.list)} />
          </List>
          :    
          <div style={{
              display: "flex",
              flex: "0 0 auto",
              flexWrap: "wrap",
              margin: "1em",
              justifyContent: "space-between"
            }}
          >
            <ContactListCards {...addHandlers(props)} list={Object.values(contacts.list)} />            
          </div>
        )}}          
      </Subscribe>
    </div>
  );  
}
