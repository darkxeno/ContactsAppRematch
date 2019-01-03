import React, { useEffect, useState } from 'react';
import Sidebar from 'react-sidebar';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Button } from '@blueprintjs/core';
import { state as GlobalState, actions as GlobalActions } from '../../state/global';

const styles = {
  sidebar: {
    root: { position: 'initial' },
    content: { display: 'none' },
    overlay: { display: 'none' },
    sidebar: { background: '#30404d', paddingTop: '3.5rem' },
  },
};

const mql = window.matchMedia('(min-width: 800px)');

function DrawerMenu(props) {
  const [state, setState] = useState({ isSmallScreen: !mql.matches, isOpen: true });

  function mediaQueryChanged() {
    setState({ ...state, isSmallScreen: !mql.matches });
  }

  function isOpenChanged() {
    const isOpen = GlobalState.get().menu.right;
    if (isOpen !== state.isOpen) {
      setState({ ...state, isOpen });
    }
  }

  useEffect(() => {
    mql.addListener(mediaQueryChanged);
    GlobalState.on(isOpenChanged);
    return function cleanup() {
      mql.removeListener(mediaQueryChanged);
      GlobalState.off(isOpenChanged);
    };
  });

  const { isOpen } = state;

  if (!state.isSmallScreen) {
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
