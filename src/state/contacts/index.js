import { state, update } from 'bey';
import { getContactsService, getContactService, updateContactService, postContactService } from "../../services/contacts";
import { getGroupsService } from "../../services/groups";

const LIST_MODE = 'list';
const CARD_MODE = 'card';

let contacts = state({
  list: {},
  groups: {},
  mode: LIST_MODE,
  current: {}
});

async function loadData(id) {
  let contactsResponse;
  if(id){
    contactsResponse = [ await getContactService(id) ];  
  } else {
    contactsResponse = await getContactsService();
  }
	
  const groupsResponse = await getGroupsService();
  let newGroups = {};

  groupsResponse.forEach(group => {
    newGroups[ group.id ] = group;
  })
  let newContacts = {};
  contactsResponse.forEach(contact => {
    if(contact.groups && contact.groups.length > 0){
      contact.groupNames = contact.groups.map( groupId => {
        if(newGroups[groupId]){
          return newGroups[groupId].name;
        } else {
          return '';
        }
      }).join(', ');      
    }
    newContacts[ contact.id ] = contact;
  })
  update(contacts, state => { 
    if( id ){
      state.current = newContacts[id];
    } else {
      state.list = newContacts;  
    }
    
    state.groups = newGroups;
  });
}

function updateContact(contact) {
  
}

async function saveContact(contact) {  
  try {
    let response;

    if (contact.id) {
      response = await updateContactService(contact);      
    } else {
      response = await postContactService(contact);
    }

    console.log('current contact updated:',response);
    update(contacts, state => { current: contact });    
    
    //dispatch.snackbar.setMessage("Contact created successfully");
  } catch (error) {
    //dispatch.snackbar.displayError(error);
  }  


  //props.history.goBack();
}

export default { state: contacts, actions: { loadData, updateContact, saveContact } };



 