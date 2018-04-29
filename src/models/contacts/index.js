import reducers from "./reducer";
import effects from "./effects";

export default {
  state: {
    ids: [],
    data: {}
  },
  reducers,
  effects,
  selectors: {
    makeSelectContact(state) {
      return id => state.data[id] || {};
    }
  }
};
