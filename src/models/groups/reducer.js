export default {
  addGroup(state, payload) {
    return {
      ...state,
      ids: [...state.ids, payload.id],
      data: {
        ...state.data,
        [payload.id]: {
          ...payload
        }
      }
    };
  },
  updateGroup(state, payload) {
    return {
      ...state,
      data: {
        ...state.data,
        [payload.id]: {
          ...payload
        }
      }
    };
  },
  deleteGroup(state, payload) {
    const { [payload.id]: _, ...others } = state.data;
    return {
      ...state,
      ids: state.ids.filter(id => id !== payload.id),
      data: {
        ...others
      }
    };
  },
  listGroups(state, payload) {
    return {
      ...state,
      ids: payload.map(({ id }) => id),
      data: payload.reduce((data, group) => {
        data[group.id] = group;
        return data;
      }, {})
    };
  }
};
