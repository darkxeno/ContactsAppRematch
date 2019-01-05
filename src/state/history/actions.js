import { actions as GlobalActions } from '../global';
import { actions as ContactsActions } from '../contacts';
import router, { navigate } from '../../router/router-config';
import { ROUTES } from '../../router/routes';

const textToRouter = {
  List: ROUTES.LIST_CONTACTS,
  About: ROUTES.HOME,
  'Add Contact': ROUTES.ADD_CONTACT,
  'Add Group': ROUTES.ADD_GROUP,
};

const actions = {
  transitionToContactList: async () => {
    await ContactsActions.loadData();
    navigate(ROUTES.LIST_CONTACTS);
  },
  transitionToEditContact: async ({ id }) => {
    await [ContactsActions.loadData(id), ContactsActions.loadContactsIfEmpty()];
    GlobalActions.setRightMenuVisibility(true);
    navigate(ROUTES.EDIT_CONTACT, { id });
  },
  transitionToContactDetail: async ({ id }) => {
    await [ContactsActions.loadData(id), ContactsActions.loadContactsIfEmpty()];
    GlobalActions.setRightMenuVisibility(true);
    navigate(ROUTES.CONTACT_DETAILS, { id });
  },
  transitionToMenuOption: (text) => {
    if (actions[textToRouter[text]]) {
      actions[textToRouter[text]]();
    } else {
      navigate(textToRouter[text]);
    }
  },
  goBack: () => window.history.back(),
  router: {
    canDeactivate: router.canDeactivate,
  },
};

actions[ROUTES.EDIT_CONTACT] = actions.transitionToEditContact;
actions[ROUTES.CONTACT_DETAILS] = actions.transitionToContactDetail;
actions[ROUTES.LIST_CONTACTS] = actions.transitionToContactList;

export default actions;
