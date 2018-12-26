import { state, update } from 'bey';
import { actions as SnackbarActions } from "../snackbar/";

const LIST_MODE = 'list';
const CARD_MODE = 'card';

let global = state({
  loading: { state: false, total: 0, message: null },
  mode: LIST_MODE
});

function setLoading(loading, message) {
  update(global, state => {
    if(loading){
      state.loading.total++;
    } else {
      state.loading.total--;
    }

    state.loading.state = state.loading.total > 0;
    state.loading.message = message; 
  });
}

function changeMode(mode) {
  if (mode === LIST_MODE || mode === CARD_MODE) {
    update(global, state => { state.mode = mode; });
    SnackbarActions.setMessage(`Mode changed to: ${mode}`); 
  }
}

const exported = { state: global, actions: { setLoading, changeMode } };
export const actions = exported.actions;
export default exported;