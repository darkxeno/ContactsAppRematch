import React, { useEffect, useState } from 'react';
import { Subscribe } from 'bey';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Sidebar from 'react-sidebar';
import { Menu, MenuItem } from '@blueprintjs/core';
import { actions } from '../../state/history';
import { state as GlobalState, actions as GlobalActions } from '../../state/global';
import { ROUTES } from '../../router/routes';

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
  return (
    <Menu className={classes.leftMenuRoot}>
      <MenuItem
        active={route.name === ROUTES.HOME}
        onClick={(e) => {
          selectMenuOption(e);
          if (smallScreen) {
            GlobalActions.toggleLeftMenu();
          }
        }}
        text="About"
      />
      <MenuItem
        active={
          [ROUTES.LIST_CONTACTS, ROUTES.CONTACT_DETAILS, ROUTES.EDIT_CONTACT].indexOf(route.name) !== -1
        }
        onClick={(e) => {
          selectMenuOption(e);
          if (smallScreen) {
            GlobalActions.toggleLeftMenu();
          }
        }}
        text="List"
      />
      <MenuItem
        active={route.name === ROUTES.ADD_CONTACT}
        onClick={(e) => {
          selectMenuOption(e);
          if (smallScreen) {
            GlobalActions.toggleLeftMenu();
          }
        }}
        text="Add Contact"
      />
      <MenuItem
        active={route.name === ROUTES.ADD_GROUP}
        onClick={(e) => {
          selectMenuOption(e);
          if (smallScreen) {
            GlobalActions.toggleLeftMenu();
          }
        }}
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

  return (
    <Subscribe to={GlobalState} on={(state) => state.menu.left}>
      {(visible) => {
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
        return null;
      }}
    </Subscribe>
  );
}

InnerMenu.propTypes = {
  route: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  smallScreen: PropTypes.bool.isRequired,
};

export default LeftMenu;
