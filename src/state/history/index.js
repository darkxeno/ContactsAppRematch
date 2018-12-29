import { navigate } from '../../router/router-config';
import { ROUTES } from '../../router/routes';
import { actions as GlobalActions } from '../global/';

const textToRouter = {
  List: ROUTES.LIST_CONTACTS,
  About: ROUTES.HOME,
  "Add Contact": ROUTES.ADD_CONTACT,
  "Add Group": ROUTES.ADD_GROUP
};

export const actions = {
	transitionToEditContact: (id) => {
    GlobalActions.setRightMenuVisibility(true);
    navigate(ROUTES.EDIT_CONTACT,{ id });
  },
	transitionToContactDetail: (id) => {
    GlobalActions.setRightMenuVisibility(true);
    navigate(ROUTES.CONTACT_DETAILS,{ id });
  },
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