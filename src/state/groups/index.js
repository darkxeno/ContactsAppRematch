import { state, update } from 'bey';
import { actions as SnackbarActions } from "../snackbar/";
import { 
  getGroupsService, 
  getGroupService, 
  postGroupService, 
  updateGroupService
} from "../../services/groups";

let groups = state({
  list: {},
  current: {}
});

async function loadData(id) {
  let groupsResponse;
  if(id){
    groupsResponse = await getGroupService(id); 
    update(groups, state => { state.current = groupsResponse; }); 
  } else {
    groupsResponse = await getGroupsService();
    update(groups, state => { state.list = groupsResponse; });
  }
}

async function saveGroup(group) {  
  try {
    if (group.id) {
      await updateGroupService(group); 
      SnackbarActions.setMessage("Group updated successfully");     
    } else {
      await postGroupService(group);
      SnackbarActions.setMessage("Group created successfully");
    }

    update(groups, state => { state.current = group; });
        
  } catch (error) {
    SnackbarActions.displayError(error);
  }  

  //props.history.goBack();
}

export default { state: groups, actions: { loadData, saveGroup } };
