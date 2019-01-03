import React from 'react';
import { Toaster, Toast, Position } from '@blueprintjs/core';
import { Subscribe } from 'bey';
import { state as SnackbarState, actions as SnackbarActions } from '../../state/snackbar';

function SB() {
  return (
    <Subscribe to={SnackbarState}>
      {(message) => (
        <Toaster position={Position.BOTTOM}>
          {message ? (
            <Toast
              message={message || ''}
              timeout={3000}
              onDismiss={SnackbarActions.close}
            />
          ) : null}
        </Toaster>
      )}
    </Subscribe>
  );
}

export default SB;
