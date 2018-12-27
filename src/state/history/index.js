import { navigate, ROUTES } from '../../router';
import { state, update } from 'bey';

const textToRouter = {
  List: ROUTES.LIST_CONTACTS,
  About: ROUTES.HOME,
  "Add Contact": ROUTES.ADD_CONTACT,
  "Add Group": ROUTES.ADD_GROUP
};

export const actions = {
	transitionToEditContact: (id) => navigate(ROUTES.EDIT_CONTACT,{ id }),
	transitionToContactDetail: (id) => navigate(ROUTES.CONTACT_DETAILS,{ id }),
  transitionToMenuOption: text => navigate(textToRouter[text]),
};

const exported = { 
  name: 'history',
  history: { 
    goBack:()=>window.history.back()
  }, 
  actions,
};
export const history = exported.history;
export default exported;