export default {
  state: null,
  reducers: {
    setMessage(state, payload) {
      return payload;
    },
    close() {
      return null;
    }
  },
  effects: {
    displayError(error) {
      let message = "Unknown error";
      if (error && error.message) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }
      this.setMessage(message);
    }
  }
};
