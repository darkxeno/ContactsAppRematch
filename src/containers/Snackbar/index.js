import React from "react";
import { Toaster, Toast, Position } from "@blueprintjs/core";
import { Subscribe } from 'bey';
import SnackbarState from '../../state/snackbar/';


function SB() {
  return (
    <Subscribe to={SnackbarState.state}>
    { message =>
      <Toaster position={Position.BOTTOM}>
        {(message)?<Toast 
              message={message ? message : ''}
              timeout={3000}
              onDismiss={SnackbarState.actions.close}
           />:null}
      </Toaster>
    }
    </Subscribe>
  );
}

export default SB;
