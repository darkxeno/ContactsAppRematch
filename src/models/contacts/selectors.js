import { createSelector } from "reselect";
import { makeSelectGroupsData } from "../groups/selectors";

const selectContactsDomain = () => state => state.contacts.Contact;

const makeSelectContactsIds = () =>
  createSelector(selectContactsDomain(), contacts => contacts.items);

const makeSelectContactsData = () =>
  createSelector(selectContactsDomain(), contacts => contacts.itemsById);

const makeSelectContactById = id =>
  createSelector(makeSelectContactsData(), contacts => contacts[id] || {});

const makeSelectContactByIdPopulated = id =>
  createSelector(
    makeSelectContactsData(),
    makeSelectGroupsData(),
    (contacts, groups) => {
      const contact = contacts[id];
      if (contact) {
        return {
          ...contact,
          groups: (contact.groups || []).map(groupId => groups[groupId])
        };
      }
    }
  );

const makeSelectContactListPopulated = () =>
  createSelector(
    makeSelectContactsIds(),
    makeSelectContactsData(),
    makeSelectGroupsData(),
    (ids, data, groups) => {
      return ids.map(id => ({
        ...data[id],
        groups: (data[id].groups || []).map(groupId => groups[groupId].name).join(', ')
      }));
    }
  );

export {
  selectContactsDomain,
  makeSelectContactListPopulated,
  makeSelectContactById,
  makeSelectContactByIdPopulated
};
