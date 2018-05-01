import { createSelector } from "reselect";
import { createSelector as createORMSelector } from 'redux-orm';
import { orm } from './index';
import { makeSelectGroupsData } from "../groups/selectors";


const selectContactsDomain = () => state => state.contacts.Contact;

const makeSelectContactsIds = () =>
  createSelector(selectContactsDomain(), contacts => contacts.items);

const makeSelectContactsData = () =>
  createSelector(selectContactsDomain(), contacts => contacts.itemsById);

const makeSelectContactById = id =>
  createSelector(makeSelectContactsData(), contacts => contacts[id] || {});

const dbStateSelector = state => state.contacts;

const contactsSelector = createORMSelector(
    orm,
    dbStateSelector,
    session => {
      return session.Contact.all().toModelArray().map(contact=>{
          return { 
            ...contact.ref, 
            groups: contact.groupsRel.toRefArray().map(g=>g.name).join(', ')
          };
        });
    }
);

const makeSelectContactListPopulated = () =>
  createSelector(
    contactsSelector,
    contacts => contacts
  );

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



export {
  selectContactsDomain,
  makeSelectContactListPopulated,
  makeSelectContactById,
  makeSelectContactByIdPopulated
};
