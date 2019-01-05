import { state as stateCreate, update } from 'bey';
import router, { navigate } from '../../router/router-config';
import { ROUTES } from '../../router/routes';
import { actions as GlobalActions } from '../global';


const textToRouter = {
  List: ROUTES.LIST_CONTACTS,
  About: ROUTES.HOME,
  'Add Contact': ROUTES.ADD_CONTACT,
  'Add Group': ROUTES.ADD_GROUP,
};

const actionsObject = {
  transitionToEditContact: (id) => {
    GlobalActions.setRightMenuVisibility(true);
    navigate(ROUTES.EDIT_CONTACT, { id });
  },
  transitionToContactDetail: (id) => {
    GlobalActions.setRightMenuVisibility(true);
    navigate(ROUTES.CONTACT_DETAILS, { id });
  },
  transitionToMenuOption: (text) => navigate(textToRouter[text]),
  goBack: () => window.history.back(),
  router: {
    canDeactivate: router.canDeactivate,
  },
};

const history = stateCreate({
  route: router.getState(),
  previousRoute: {},
});

const exported = {
  name: 'history',
  state: history,
  actions: actionsObject,
};

router.subscribe((change) => {
  update(history, (state) => {
    // console.log('History route changed:', change);
    state.route = change.route;
    state.previousRoute = change.previousRoute;
  });
});

export const { state, actions } = exported;
export default exported;
