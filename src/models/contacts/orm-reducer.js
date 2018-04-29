import orm from '../db/orm';

export default {
  addContact(dbState, payload) {
    const session = orm.session(dbState);
    const { Contact } = session;
    Contact.create(payload);
    return session.state;
  },
  updateContact(dbState, payload) {
    const session = orm.session(dbState);
    const { Contact } = session;
    Contact.update(payload);
    return session.state;
  },
  deleteContact(dbState, payload) {
    const session = orm.session(dbState);
    const { Contact } = session;
    Contact.withId(payload.id).delete();
    return session.state;
  },
  listContacts(dbState, payload) {    
    const session = orm.session(dbState);
    const { Contact } = session;
    payload.forEach(contact => Contact.create(contact));
    return session.state;
  }
};
