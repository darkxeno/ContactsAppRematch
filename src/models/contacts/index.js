//import reducers from "./reducer";
import reducers from "./orm-reducer";
import effects from "./effects";
import orm from '../db/orm';

export default {
  /*state: {
    ids: [],
    data: {}
  },*/
  state: orm.getEmptyState(),
  reducers,
  effects,
  selectors: {
    makeSelectContact(state) {
      return id => state.data[id] || {};
    }
  }
};
