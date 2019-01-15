import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Alert } from '@blueprintjs/core';
import { actions as HistoryActions } from '../state/history';

function ModifiedCheckAlert({
  isModified, routesToBlock, children,
}) {
  const [state, setState] = useState({ alertIsOpen: false });

  const handleCancel = useCallback(() => {
    state.continue();
    setState({ alertIsOpen: false });
  });

  const handleContinue = useCallback(() => {
    state.cancel();
    setState({ alertIsOpen: false });
  });

  useEffect(() => {
    if (HistoryActions.router) {
      // eslint-disable-next-line no-unused-vars
      const canDeactivate = (routerProvided) => (toState, fromState) => {
        const isModifiedVal = isModified();
        if (isModifiedVal) {
          return new Promise((resolve, reject) => {
            setState({ alertIsOpen: true, continue: reject, cancel: resolve });
          });
        }
        return true;
      };

      routesToBlock.forEach((route) => {
        HistoryActions.router.canDeactivate(route, canDeactivate);
      });
    }
  });

  const { alertIsOpen } = state;
  return (
    <div>
      <Alert
        cancelButtonText="Cancel"
        confirmButtonText="Continue"
        icon="trash"
        intent="danger"
        isOpen={alertIsOpen}
        onCancel={handleCancel}
        onConfirm={handleContinue}
      >
        <p>Are you sure you want leave? Your changes will be lost.</p>
      </Alert>
      {children}
    </div>
  );
}

ModifiedCheckAlert.propTypes = {
  isModified: PropTypes.func.isRequired,
  routesToBlock: PropTypes.array.isRequired,
  children: PropTypes.object.isRequired,
};

export default ModifiedCheckAlert;
