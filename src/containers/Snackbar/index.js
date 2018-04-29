import React from "react";
import { connect } from "react-redux";
import Snackbar from "material-ui/Snackbar";

function SB({ open, message, close }) {
  return (
    <Snackbar
      open={open}
      message={message}
      autoHideDuration={3000}
      onRequestClose={close}
    />
  );
}

const mapStateToProps = state => {
  return {
    message: state.snackbar,
    open: state.snackbar ? true : false
  };
};
const mapDispatchToProps = dispatch => {
  return {
    close: () => dispatch.snackbar.close()
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SB);
