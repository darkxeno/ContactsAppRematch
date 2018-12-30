import { useEffect, useState, default as React } from 'react';
import { Menu, MenuItem } from '@blueprintjs/core';
import { actions } from '../../state/history/';
import GlobalState from '../../state/global/';
import { Subscribe } from 'bey';
import { ROUTES } from '../../router/routes';
import Sidebar from 'react-sidebar';

function selectMenuOption(e) {
  actions.transitionToMenuOption(e.target.textContent);
}

function InnerMenu(props) {
  return (
    <Menu className="leftMenu" style={{ paddingTop: '4rem' }}>
      <MenuItem
        active={props.route.name === ROUTES.HOME}
        onClick={e => {
          selectMenuOption(e);
        }}
        text="About"
      />
      <MenuItem
        active={
          [ROUTES.LIST_CONTACTS, ROUTES.CONTACT_DETAILS, ROUTES.EDIT_CONTACT].indexOf(
            props.route.name,
          ) !== -1
        }
        onClick={e => {
          selectMenuOption(e);
        }}
        text="List"
      />
      <MenuItem
        active={props.route.name === ROUTES.ADD_CONTACT}
        onClick={e => {
          selectMenuOption(e);
        }}
        text="Add Contact"
      />
      <MenuItem
        active={props.route.name === ROUTES.ADD_GROUP}
        onClick={e => {
          selectMenuOption(e);
        }}
        text="Add Group"
      />
    </Menu>
  );
}

const mql = window.matchMedia(`(min-width: 800px)`);

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
    <Subscribe to={GlobalState.state} on={state => state.menu.left}>
      {visible => {
        if (visible) {
          if (!smallScreen) {
            return <InnerMenu {...props} />;
          } else {
            return (
              <Sidebar
                open={visible}
                styles={{ sidebar: { background: '#30404d' } }}
                onSetOpen={GlobalState.actions.toggleLeftMenu}
                sidebar={<InnerMenu {...props} />}
              >
                {false}
              </Sidebar>
            );
          }
        }
        return null;
      }}
    </Subscribe>
  );
}
