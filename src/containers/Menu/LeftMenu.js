import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Sidebar from 'react-sidebar';
import { Menu, MenuItem } from '@blueprintjs/core';
import { actions } from '../../state/history';
import Global, { actions as GlobalActions } from '../../state/global';
import { ROUTES } from '../../router/routes';
import { useMultiple } from '../../state/helpers/useStateProvider';

const styles = {
  sidebar: {
    sidebar: {
      background: '#30404d',
    },
  },
  leftMenuRoot: {
    paddingTop: '4rem',
    '&.selected': {
      background: '#5C7080',
    },
  },
};

function selectMenuOption(e) {
  actions.transitionToMenuOption(e.target.textContent);
}

function InnerMenu({
  route, smallScreen, classes,
}) {
  function handleClick(e) {
    selectMenuOption(e);
    if (smallScreen) {
      GlobalActions.toggleLeftMenu();
    }
  }

  return (
    <Menu className={classes.leftMenuRoot}>
      <MenuItem
        active={route.name === ROUTES.HOME}
        onClick={handleClick}
        text="About"
      />
      <MenuItem
        active={
          [ROUTES.LIST_CONTACTS, ROUTES.CONTACT_DETAILS, ROUTES.EDIT_CONTACT].indexOf(route.name) !== -1
        }
        onClick={handleClick}
        text="List"
      />
      <MenuItem
        active={route.name === ROUTES.ADD_CONTACT}
        onClick={handleClick}
        text="Add Contact"
      />
      <MenuItem
        active={route.name === ROUTES.ADD_GROUP}
        onClick={handleClick}
        text="Add Group"
      />
    </Menu>
  );
}

const mql = window.matchMedia('(min-width: 800px)');

const StyledInnerMenu = injectSheet(styles)(InnerMenu);

function LeftMenu(props) {
  const [smallScreen, setSmallScreen] = useState(!mql.matches);

  function mediaQueryChanged() {
    setSmallScreen(!mql.matches);
  }

  useEffect(() => {
    mql.addListener(mediaQueryChanged);
    return function cleanup() {
      mql.removeListener(mediaQueryChanged);
    };
  });

  const { global: visible } = useMultiple({ global: Global }, { global: (state) => state.menu.left }, 'LeftMenu');

  return (
    () => {
      if (visible) {
        if (!smallScreen) {
          return <StyledInnerMenu smallScreen={smallScreen} {...props} />;
        }
        return (
          <Sidebar
            open={visible}
            styles={styles.sidebar}
            onSetOpen={GlobalActions.toggleLeftMenu}
            sidebar={<StyledInnerMenu smallScreen={smallScreen} {...props} />}
          >
            {false}
          </Sidebar>
        );
      }
      return false;
    }
  )();
}

InnerMenu.propTypes = {
  route: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  smallScreen: PropTypes.bool.isRequired,
};

export default LeftMenu;
