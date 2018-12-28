import { state as stateCreate, update } from 'bey';
import { actions as SnackbarActions } from "../snackbar/";
import { getGroupsService } from "../../services/groups";
import { 
  getContactsService, 
  getContactService, 
  updateContactService, 
  postContactService,
  deleteContactService
} from "../../services/contacts";
import { history } from "../history/";
import { loading, modified, changelog } from "../helpers/";

let contacts = stateCreate({
  list: {},
  groups: {},
  current: {}  
});

async function loadData(id) {

  const groupsResponse = await getGroupsService();
  let newGroups = {};

  groupsResponse.forEach(group => {
    newGroups[ group.id ] = group;
  })

  let contactsResponse;
  if(id){
    contactsResponse = [ await getContactService(id) ];  
  } else {
    contactsResponse = await getContactsService();
  }
	
  let newContacts = {};

  contactsResponse.forEach(contact => {
    if(contact){
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
    }
  });

  update(contacts, state => { 
    if( id ){
      state.current = newContacts[id] || {};
      //state.modified = false;
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
    update(contacts, state => { 
      state.current = contact; 
      state.modified = false;
    });
    
    SnackbarActions.setMessage(`Contact ${contact.id?"updated":"created"} successfully`);
  } catch (error) {
    SnackbarActions.displayError(error);
  }  
  history.goBack();
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
  history.goBack();
}

function contactList(state){
  return { current: state.current, groups: state.groups };
}

const exported = { 
  name: 'contacts',
  state: contacts, 
  actions: { loadData, saveContact, deleteContact },
  selectors: { contactList } 
};

export const actions = exported.actions;
export const selectors = exported.selectors;
export const state = exported.state;

export default changelog( modified( loading( exported )));



 