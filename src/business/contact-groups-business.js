import { actions as ContactsActions } from '../state/contacts';
import { actions as GroupsActions } from '../state/groups';
import { actions as SnackbarActions } from '../state/snackbar';

async function loadData(contactId, groupId) {
  try {
    await [ContactsActions.loadData(contactId), GroupsActions.loadData(groupId)];
    SnackbarActions.setMessage('Contacts + Groups loaded');
  } catch (error) {
    SnackbarActions.displayError(error);
  }
}

const exported = {
  name: 'contacts+groups',
  actions: { loadData },
};
export const { actions } = exported;
export default exported;
