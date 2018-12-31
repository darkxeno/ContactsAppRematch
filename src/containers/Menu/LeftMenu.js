import React, { useEffect, useState } from 'react';
import { Subscribe } from 'bey';
import PropTypes from 'prop-types';
// import injectSheet from 'react-jss';
import Sidebar from 'react-sidebar';
import { Menu, MenuItem } from '@blueprintjs/core';
import { actions } from '../../state/history/';
import { state as GlobalState, actions as GlobalActions } from '../../state/global/';
import { ROUTES } from '../../router/routes';

const styles = {
  sidebar: {
    sidebar: {
      background: '#30404d',
    },
  },
  leftMenuRoot: {
    paddingTop: '4rem',
  },
};

function selectMenuOption(e) {
  actions.transitionToMenuOption(e.target.textContent);
}

function InnerMenu(props) {
  return (
    <Menu className="leftMenu">
      <MenuItem
        active={props.route.name === ROUTES.HOME}
        onClick={(e) => {
          selectMenuOption(e);
          GlobalActions.toggleLeftMenu();
        }}
        text="About"
      />
      <MenuItem
        active={
          [ROUTES.LIST_CONTACTS, ROUTES.CONTACT_DETAILS, ROUTES.EDIT_CONTACT].indexOf(props.route.name) !== -1
        }
        onClick={(e) => {
          selectMenuOption(e);
          GlobalActions.toggleLeftMenu();
        }}
        text="List"
      />
      <MenuItem
        active={props.route.name === ROUTES.ADD_CONTACT}
        onClick={(e) => {
          selectMenuOption(e);
          GlobalActions.toggleLeftMenu();
        }}
        text="Add Contact"
      />
      <MenuItem
        active={props.route.name === ROUTES.ADD_GROUP}
        onClick={(e) => {
          selectMenuOption(e);
          GlobalActions.toggleLeftMenu();
        }}
        text="Add Group"
      />
    </Menu>
  );
}

const mql = window.matchMedia('(min-width: 800px)');

export default function LeftMenu(props) {
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
            return <InnerMenu {...props} />;
          }
          return (
            <Sidebar
              open={visible}
              styles={styles.sidebar}
              onSetOpen={GlobalActions.toggleLeftMenu}
              sidebar={<InnerMenu {...props} />}
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
};
