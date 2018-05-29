import { ORM } from 'redux-orm';
//import reducers from "./reducer";
import effects from "./effects";
import { Contact, Group } from '../db/index';

export const orm = new ORM();
orm.register(Contact, Group);

export default {
  /*state: {
    ids: [],
    data: {}
  },*/  
  state: orm.getEmptyState(),
  effects,
  reducers:{
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

	    Contact.createOrUpdateAll(payload);
	    
	    return session.state;
	  },
	  updateGroups(dbState, payload) {
	    const session = orm.session(dbState);
	    const { Group } = session;

	    Group.createOrUpdateAll(payload);

	    return session.state;
	  } 	  
	}
};
