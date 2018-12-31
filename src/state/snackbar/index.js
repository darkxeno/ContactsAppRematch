import { state as stateCreate, update } from 'bey';

const snackbar = stateCreate(null);

function setMessage(message) {
  update(snackbar, () => message);
}

function displayError(error) {
  let message = 'Unknown error';

  if (error && error.message) {
    // eslint-disable-next-line prefer-destructuring
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  }
  update(snackbar, () => message);
}

function close() {
  update(snackbar, () => null);
}

const exported = {
  name: 'snackbar',
  state: snackbar,
  actions: { setMessage, displayError, close },
};
export const { state, actions } = exported;
export default exported;
