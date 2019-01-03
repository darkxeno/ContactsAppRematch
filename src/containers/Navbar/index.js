import React from 'react';
import { Subscribe } from 'bey';
import PropTypes from 'prop-types';
import { Navbar, Button, Alignment } from '@blueprintjs/core';
import IconElementList from '../../components/IconElementList';
import { state as GlobalState, actions as GlobalActions } from '../../state/global';
import { ROUTES } from '../../router/routes';

function MyNavbar({
  route,
}) {
  return (
    <Subscribe to={GlobalState}>
      {() => (
        <React.Fragment>
          <Navbar>
            <Navbar.Group align={Alignment.LEFT}>
              <Button
                className="bp3-minimal"
                icon="menu"
                onClick={GlobalActions.toggleLeftMenu}
              />
              <Navbar.Divider />
              <Navbar.Heading>Contacts app</Navbar.Heading>
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
              {route.name === ROUTES.LIST_CONTACTS ? (
                <IconElementList changeListMode={GlobalActions.changeMode} />
              ) : null}
            </Navbar.Group>
          </Navbar>
        </React.Fragment>
      )}
    </Subscribe>
  );
}

MyNavbar.propTypes = {
  route: PropTypes.object.isRequired,
};

export default MyNavbar;
