import { useEffect, useState, default as React } from "react";
import { Button } from "@blueprintjs/core";
import ContactCard from "../../components/ContactCard";
import { Subscribe } from 'bey';
import ContactsState from '../../state/contacts/';
import GlobalState from '../../state/global/';
import { actions } from '../../state/history/';

function addHandlers(props){
  return { 
    ...props, 
    ...actions
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
  
  return props.list.map(contact => 
    <div key={`contact-${contact.id}`} id={contact.id}>
      <div 
        onClick={() => props.transitionToContactDetail(contact.id)} 
        className='bp3-tag bp3-interactive'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '60px',
          paddingLeft: '8px',
          margin: '3px'
        }}>
        <div style={{ display: 'flex' }}>
          {
            contact.imgUrl ? (
                <img src={contact.imgUrl} alt={contact.name} />
              ) : (
                <div style={{
                  width: '50px',
                  height: '50px',
                  fontSize: '50px',
                  backgroundColor: 'lightgrey',
                  color: 'white',
                  textAlign: 'center',
                  lineHeight: '50px',
                  borderRadius: '50px',
                }}>{contact.name.substring(0, 1)}</div>
              )
          }
          <div style={{ display: 'flex', flexDirection: 'column', alignSelf: 'center', marginLeft: '2rem'}}>        
            <div style={{ fontWeight: 'bolder' }}>{contact.name}</div>
            <div style={{ fontSize: '12px'}}>{contact.groupNames || "Without group"}</div>
          </div>
        </div>  
        <Button icon="delete" onClick={() => ContactsState.actions.deleteContact(contact.id)} />
      </div>
    </div>
  );
}

export default function ContactList(props){

  const [global, setGlobal] = useState(GlobalState.state.get());

  function handler(){
    const newMode = GlobalState.state.get().mode;
    if(newMode !== global.mode){
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
    <div style={{ margin: "0.2em 0 0 0" }}>
      <Subscribe to={ContactsState.state}>
        { contacts => {
          return (
                (global.mode === 'list') ?
                <div>
                  <ContactListItems {...addHandlers(props)} list={Object.values(contacts.list)} />
                </div>
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
