import { state, update } from 'bey';

let snackbar = state(null);

function setMessage(message) {
  update(snackbar, state => message);
}

function displayError(error) {
  let message = 'Unknown error';

  if (error && error.message) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  }
  update(snackbar, state => message);
}

function close() {
  update(snackbar, state => null);
}

const exported = {
  name: 'snackbar',
  state: snackbar,
  actions: { setMessage, displayError, close },
};
export const actions = exported.actions;
export default exported;
