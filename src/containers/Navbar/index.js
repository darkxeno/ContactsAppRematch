import React from "react";
import { Navbar, Button, Alignment, Popover, Menu, MenuItem, Position } from "@blueprintjs/core";
import IconElementList from "../../components/IconElementList";
import { Subscribe } from 'bey';
import GlobalState from '../../state/global/';
import { actions } from '../../state/history/';
import { ROUTES } from '../../router';

function selectMenuOption(e){
  actions.transitionToMenuOption(e.target.textContent);
}

function MyNavbar({  
  handleToggle,
  isLeftNavOpen,
  setIsLeftNavOpen,
  route
}) {
  return (
    <Subscribe to={GlobalState.state}>
    { state =>
        <React.Fragment>
          <Navbar>
              <Navbar.Group align={Alignment.LEFT}>                  
                <Popover content={
                    <Menu>
                      <MenuItem onClick={selectMenuOption} text="About"/>
                      <MenuItem onClick={selectMenuOption} text="List"/>
                      <MenuItem onClick={selectMenuOption} text="Add Contact"/>
                      <MenuItem onClick={selectMenuOption} text="Add Group"/>
                    </Menu>    
                  } position={Position.RIGHT_TOP}>
                    <Button className="bp3-minimal" icon="menu"/>
                  </Popover>                  
                  <Navbar.Divider />
                  <Navbar.Heading>Contacts app</Navbar.Heading>                  
              </Navbar.Group>
              <Navbar.Group align={Alignment.RIGHT}>
              {
                (route.name === ROUTES.LIST_CONTACTS)?
                  <IconElementList changeListMode={GlobalState.actions.changeMode} />
                : null
              }
              </Navbar.Group>
          </Navbar>
        </React.Fragment>
    }
    </Subscribe>    
  );
}

export default MyNavbar;
