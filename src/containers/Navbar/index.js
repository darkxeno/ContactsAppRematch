import React from 'react';
import { Navbar, Button, Alignment } from '@blueprintjs/core';
import IconElementList from '../../components/IconElementList';
import { Subscribe } from 'bey';
import GlobalState from '../../state/global/';
import { ROUTES } from '../../router/routes';

function MyNavbar({ handleToggle, isLeftNavOpen, setIsLeftNavOpen, route }) {
  return (
    <Subscribe to={GlobalState.state}>
      {state => (
        <React.Fragment>
          <Navbar>
            <Navbar.Group align={Alignment.LEFT}>
              <Button
                className="bp3-minimal"
                icon="menu"
                onClick={GlobalState.actions.toggleLeftMenu}
              />
              <Navbar.Divider />
              <Navbar.Heading>Contacts app</Navbar.Heading>
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
              {route.name === ROUTES.LIST_CONTACTS ? (
                <IconElementList changeListMode={GlobalState.actions.changeMode} />
              ) : null}
            </Navbar.Group>
          </Navbar>
        </React.Fragment>
      )}
    </Subscribe>
  );
}

export default MyNavbar;
