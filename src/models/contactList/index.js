import { LIST_MODE } from "./constants";

export default {
  state: {
    mode: LIST_MODE
  },
  reducers: {
    changeMode(state, payload) {
      if(state.mode!==payload){
        return {
          ...state,
          mode: payload || LIST_MODE
        };
      }
      return state;
    }
  }
};
