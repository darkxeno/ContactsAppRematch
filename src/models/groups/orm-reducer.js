
import orm from '../db/orm';

export default {
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
};
