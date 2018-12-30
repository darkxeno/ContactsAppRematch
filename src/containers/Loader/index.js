import React from 'react';
import { Toaster, Toast, Position, ProgressBar } from '@blueprintjs/core';
import { Subscribe } from 'bey';
import GlobalState from '../../state/global/';

function Loader() {
  return (
    <Subscribe to={GlobalState.state}>
      {(state) => (
        <Toaster position={Position.TOP}>
          {state.loading.state ? (
            <Toast
              message={
                <div>
                  <span>{`Loading ${state.loading.message}...`}</span>
                  <ProgressBar />
                </div>
              }
            />
          ) : null}
        </Toaster>
      )}
    </Subscribe>
  );
}

export default Loader;
