import React from 'react';
import Sidebar from 'react-sidebar';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Button } from '@blueprintjs/core';
import Global, { actions as GlobalActions, selectors as GlobalSelectors } from '../../state/global';
import { useMultipleStates } from '../../state/helpers/useStateProvider';

const styles = {
  sidebar: {
    root: { position: 'initial' },
    content: { display: 'none' },
    overlay: { display: 'none' },
    sidebar: { background: '#30404d', paddingTop: '3.5rem' },
  },
};

function DrawerMenu(props) {
  const { global: { isOpen, isSmallScreen } } = useMultipleStates('DrawerMenu', {
    global: Global,
  }, {
    global: GlobalSelectors.drawerMenu,
  });

  if (!isSmallScreen) {
    return props.children;
  }
  return (
    <Sidebar
      open={isOpen}
      pullRight
      touch
      styles={styles.sidebar}
      onSetOpen={(open) => {
        GlobalActions.setRightMenuVisibility(open);
      }}
      sidebar={(
        <div>
          <Button
            className="bp3-minimal"
            icon="cross"
            onClick={() => GlobalActions.setRightMenuVisibility(false)}
          />
          {props.children}
        </div>
      )}
    >
      {
        <Button
          className="bp3-minimal"
          icon="menu"
          onClick={() => GlobalActions.setRightMenuVisibility(!isOpen)}
        />
      }
    </Sidebar>
  );
}

DrawerMenu.propTypes = {
  children: PropTypes.object.isRequired,
  // classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(DrawerMenu);
