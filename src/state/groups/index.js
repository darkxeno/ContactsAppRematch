import { state as stateCreate, update } from 'bey';
import { actions as SnackbarActions } from '../snackbar/';
import {
  getGroupsService,
  getGroupService,
  postGroupService,
  updateGroupService,
} from '../../services/groups';
import { history } from '../history/';
import loading from '../helpers/loading';

const groups = stateCreate({
  list: {},
  current: {},
});

async function loadData(id) {
  let groupsResponse;
  if (id) {
    groupsResponse = await getGroupService(id);
    update(groups, (state) => {
      state.current = groupsResponse;
    });
  } else {
    groupsResponse = await getGroupsService();
    update(groups, (state) => {
      state.list = groupsResponse;
    });
  }
}

async function saveGroup(group) {
  try {
    if (group.id) {
      await updateGroupService(group);
      SnackbarActions.setMessage('Group updated successfully');
    } else {
      await postGroupService(group);
      SnackbarActions.setMessage('Group created successfully');
    }

    update(groups, (state) => {
      state.current = group;
    });
  } catch (error) {
    SnackbarActions.displayError(error);
  }

  history.goBack();
}

const exported = {
  name: 'groups',
  state: groups,
  actions: { loadData, saveGroup },
};
export const { state, actions } = exported;
export default loading(exported);
