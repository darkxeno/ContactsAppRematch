import { state as stateCreate, update } from 'bey';
import router from '../../router/router-config';
import actionsObject from './actions';

const initialRoute = router.getState();
const { name, params } = initialRoute;

if (actionsObject[name]) {
  actionsObject[name](params);
}

const history = stateCreate({
  route: initialRoute,
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
