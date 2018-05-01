import { ORM } from 'redux-orm';
//import reducers from "./reducer";
import effects from "./effects";
import { Group } from '../db/index';

const orm = new ORM();
orm.register(Group);

export default {
  /*state: {
    ids: [],
    data: {}
  },*/
  state: orm.getEmptyState(),
  effects,
	reducers: {
		
	  addGroup(dbState, payload) {
	    const session = orm.session(dbState);
	    const { Group } = session;
	    Group.create(payload);
	    return session.state;
	  },
	  updateGroup(dbState, payload) {
	    const session = orm.session(dbState);
	    const { Group } = session;
	    //Group.withId(payload.ip).update(payload);
	    Group.update(payload);
	    return session.state;
	  },
	  deleteGroup(dbState, payload) {
	    const session = orm.session(dbState);
	    const { Group } = session;
	    Group.withId(payload.id).delete();
	    return session.state;
	  },
	  listGroups(dbState, payload) {
	    const session = orm.session(dbState);
	    const { Group } = session;
	    Group.createOrUpdateAll(payload);
	    return session.state;
	  }
	}  
};
