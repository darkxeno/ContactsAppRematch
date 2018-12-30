import { state, update } from 'bey';

const snackbar = state(null);

function setMessage(message) {
  update(snackbar, () => message);
}

function displayError(error) {
  let message = 'Unknown error';

  if (error && error.message) {
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
export const { actions } = exported;
export default exported;
