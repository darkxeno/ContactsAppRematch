import React from 'react';
import {
  Toaster, Toast, Position, ProgressBar,
} from '@blueprintjs/core';
import Global, { selectors as GlobalSelectors } from '../../state/global';
import { useMultiple } from '../../state/helpers/useStateProvider';

function Loader() {
  const { global } = useMultiple({ global: Global }, { global: GlobalSelectors.loader }, 'Loader');

  return (
    <Toaster position={Position.TOP}>
      {global.loading.state ? (
        <Toast
          message={(
            <div>
              <span>{`Loading ${global.loading.message}...`}</span>
              <ProgressBar />
            </div>
          )}
        />
      ) : null}
    </Toaster>
  );
}

export default Loader;
