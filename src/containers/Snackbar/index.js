import React from "react";
import Snackbar from "material-ui/Snackbar";
import { Subscribe } from 'bey';
import SnackbarState from '../../state/snackbar/';


function SB() {
  return (
    <Subscribe to={SnackbarState.state}>
    { message =>
      <Snackbar
        open={message !== null}
        message={message ? message : ''}
        autoHideDuration={3000}
        onRequestClose={SnackbarState.actions.close}
      />
    }
    </Subscribe>
  );
}

export default SB;
