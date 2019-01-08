import { state as stateCreate, update } from 'bey';
import { actions as SnackbarActions } from '../snackbar';
import { getGroupsService } from '../../services/groups';
import {
  getContactsService,
  getContactService,
  updateContactService,
  postContactService,
  deleteContactService,
} from '../../services/contacts';
import HistoryActions from '../history/actions';
import {
  loading, modified, changelog, useStateProvider,
} from '../helpers';

const contacts = stateCreate({
  list: {},
  groups: {},
  current: {},
});

async function loadContactsIfEmpty() {
  const contactsArray = Object.values(contacts.get().list);
  if (contactsArray.length === 0) {
    loadData();
  }
}

async function loadData(id) {
  // TODO: move this to a service layer

  const groupsResponse = await getGroupsService();
  const newGroups = {};

  groupsResponse.forEach((group) => {
    newGroups[group.id] = group;
  });

  let contactsResponse;
  if (id) {
    contactsResponse = [await getContactService(id)];
  } else {
    contactsResponse = await getContactsService();
  }

  const newContacts = {};

  contactsResponse.forEach((contact) => {
    if (contact) {
      if (contact.groups && contact.groups.length > 0) {
        /* eslint-disable-next-line no-param-reassign */
        contact.groupNames = contact.groups
          .map((groupId) => {
            if (newGroups[groupId]) {
              return newGroups[groupId].name;
            }
            return '';
          })
          .join(', ');
      }

      newContacts[contact.id] = contact;
    }
  });

  // TODO: move until here to a service layer

  update(contacts, (state) => {
    if (id) {
      state.current = newContacts[id] || {};
      // state.modified = false;
    } else {
      state.list = newContacts;
    }

    state.groups = newGroups;
  });
}

async function saveContact(contact) {
  try {
    let response;

    if (contact.id) {
      response = await updateContactService(contact);
    } else {
      response = await postContactService(contact);
    }

    // eslint-disable-next-line no-console
    console.log('current contact updated:', response);

    update(contacts, (state) => {
      state.current = contact;
      state.modified = false;
    });

    SnackbarActions.setMessage(`Contact ${contact.id ? 'updated' : 'created'} successfully`);
  } catch (error) {
    SnackbarActions.displayError(error);
  }
  HistoryActions.transitionToContactList();
}

async function deleteContact(id) {
  try {
    if (id) {
      await deleteContactService(id);
      update(contacts, (state) => {
        state.current = {};
      });

      SnackbarActions.setMessage('Contact deleted successfully');
      loadData();
    }
  } catch (error) {
    SnackbarActions.displayError(error);
  }
}

function contactForm(state) {
  return { current: state.current, groups: state.groups };
}

function contactDetail(state) {
  return { current: state.current, loading: state.loading };
}

function contactList(state) {
  return { current: state.current, list: state.list, groups: state.groups };
}

function contactListGlobal(state) {
  return { mode: state.mode };
}

const exported = {
  name: 'contacts',
  state: contacts,
  actions: {
    loadData, loadContactsIfEmpty, saveContact, deleteContact,
  },
  selectors: {
    contactForm, contactList, contactListGlobal, contactDetail,
  },
};

export const { actions, state, selectors } = exported;
export default useStateProvider(changelog(modified(loading(exported, { localLoading: true }))));
