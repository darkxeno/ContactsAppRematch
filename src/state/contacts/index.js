import { state, update } from 'bey';
import { actions as SnackbarActions } from "../snackbar/";
import { getGroupsService } from "../../services/groups";
import { 
  getContactsService, 
  getContactService, 
  updateContactService, 
  postContactService,
  deleteContactService
} from "../../services/contacts";


let contacts = state({
  list: {},
  groups: {},
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

async function saveContact(contact) {  
  try {
    let response;

    if (contact.id) {
      response = await updateContactService(contact);      
    } else {
      response = await postContactService(contact);
    }

    console.log('current contact updated:',response);
    update(contacts, state => { state.current = contact; });
    
    SnackbarActions.setMessage(`Contact ${contact.id?"updated":"created"} successfully`);
  } catch (error) {
    SnackbarActions.displayError(error);
  }  
  //props.history.goBack();
}

async function deleteContact(id) {  
  try {
    if (id) {
      let response = await deleteContactService(id); 
      console.log('contact deleted:', response);
      update(contacts, state => { state.current = {}; });
    
      SnackbarActions.setMessage("Contact deleted successfully"); 
      loadData();          
    }
  } catch (error) {
    SnackbarActions.displayError(error);
  }  
  //props.history.goBack();
}

export default { state: contacts, actions: { loadData, saveContact, deleteContact } };



 