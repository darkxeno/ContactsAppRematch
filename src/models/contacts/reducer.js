export default {
  addContact(state, payload) {
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
  updateContact(state, payload) {
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
  deleteContact(state, payload) {
    const { [payload.id]: _, ...others } = state.data;
    return {
      ...state,
      ids: state.ids.filter(id => id !== payload.id),
      data: {
        ...others
      }
    };
  },
  listContacts(state, payload) {
    return {
      ...state,
      ids: payload.map(({ id }) => id),
      data: payload.reduce((data, contact) => {
        data[contact.id] = contact;
        return data;
      }, {})
    };
  }
};
