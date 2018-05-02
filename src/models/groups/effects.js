import { dispatch } from "@rematch/core";
import {
  postGroupService,
  updateGroupService,
  deleteGroupService,
  getGroupsService,
  getGroupService
} from "../../services/groups";

export default {
  async createGroup(group) {
    try {
      const payload = await postGroupService(group);
      this.addGroup(payload);
      dispatch.snackbar.setMessage("Group created successfully");
    } catch (error) {
      dispatch.snackbar.displayError(error);
    }
  },
  async updateGroupRequest(Group) {
    try {
      const payload = await updateGroupService(Group);
      this.updateGroup(payload);
      dispatch.snackbar.setMessage("Group updated successfully");
    } catch (error) {
      dispatch.snackbar.displayError(error);
    }
  },
  async deleteGroupRequest(id) {
    try {
      await deleteGroupService(id);
      this.deleteGroup({ id });
      dispatch.snackbar.setMessage("Group deleted successfully");
    } catch (error) {
      dispatch.snackbar.displayError(error);
    }
  },
  async requestGroupList() {
    try {
      const payload = await getGroupsService();
      this.listGroups(payload);
      dispatch.contacts.updateGroups(payload);
    } catch (error) {
      dispatch.snackbar.displayError(error);
    }
  },
  async requestGroup(id) {
    try {
      const payload = await getGroupService(id);
      this.updateGroup(payload);
    } catch (error) {
      dispatch.snackbar.displayError(error);
    }
  }
};
