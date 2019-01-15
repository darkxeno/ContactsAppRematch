import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Sidebar from 'react-sidebar';
import { Menu, MenuItem } from '@blueprintjs/core';
import { actions as HistoryActions } from '../../state/history';
import Global, { actions as GlobalActions, selectors as GlobalSelectors } from '../../state/global';
import { ROUTES } from '../../router/routes';
import { useMultipleStates } from '../../state/helpers/useStateProvider';

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
  HistoryActions.transitionToMenuOption(e.target.textContent);
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

const StyledInnerMenu = injectSheet(styles)(InnerMenu);

function LeftMenu(props) {
  const { global: { isOpen, isSmallScreen } } = useMultipleStates('LeftMenu', {
    global: Global,
  }, {
    global: GlobalSelectors.leftMenu,
  });

  return (
    () => {
      if (isOpen) {
        if (!isSmallScreen) {
          return <StyledInnerMenu smallScreen={isSmallScreen} {...props} />;
        }
        return (
          <Sidebar
            open={isOpen}
            styles={styles.sidebar}
            onSetOpen={GlobalActions.toggleLeftMenu}
            sidebar={<StyledInnerMenu smallScreen={isSmallScreen} {...props} />}
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
