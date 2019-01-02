import { dispatch } from "@rematch/core";
import {
  postContactService,
  updateContactService,
  deleteContactService,
  getContactsService,
  getContactService
} from "../../services/contacts";

export default {
  async createContact(contact) {
    try {
      await dispatch.groups.requestGroupList();
      const payload = await postContactService(contact);
      this.addContact(payload);
      dispatch.snackbar.setMessage("Contact created successfully");
    } catch (error) {
      dispatch.snackbar.displayError(error);
    }
  },
  async updateContactRequest(contact) {
    try {
      const payload = await updateContactService(contact);
      this.updateContact(payload);
      
      dispatch.snackbar.setMessage("Contact updated successfully");
    } catch (error) {
      dispatch.snackbar.displayError(error);
    }
  },
  async deleteContactRequest(id) {
    try {
      await deleteContactService(id);
      this.deleteContact({ id });
      dispatch.snackbar.setMessage("Contact deleted successfully");
    } catch (error) {
      dispatch.snackbar.displayError(error);
    }
  },
  async requestContactList() {
    try {
      await dispatch.groups.requestGroupList();
      //const payload = await getContactsService();
      //this.listContacts(payload);
    } catch (error) {
      dispatch.snackbar.displayError(error);
    }
  },
  async requestContact(id) {
    try {
      await dispatch.groups.requestGroupList();
      const payload = await getContactService(id);
      this.updateContact(payload);
    } catch (error) {
      dispatch.snackbar.displayError(error);
    }
  } 
};
