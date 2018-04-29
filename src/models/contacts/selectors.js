import { createSelector } from "reselect";
import { makeSelectGroupsData } from "../groups/selectors";

const selectContactsDomain = () => state => state.contacts;

const makeSelectContactsIds = () =>
  createSelector(selectContactsDomain(), contacts => contacts.ids);

const makeSelectContactsData = () =>
  createSelector(selectContactsDomain(), contacts => contacts.data);

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
