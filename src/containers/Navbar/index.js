import React from "react";
import { Navbar, Button, Alignment, Popover, Menu, MenuItem, Position } from "@blueprintjs/core";
import IconElementList from "../../components/IconElementList";
import {
  HOME_PATHNAME,
  LIST_PATHNAME,
  ADD_PATHNAME,
  ADD_GROUP_PATHNAME
} from "../../globals/pathNames";
import { Subscribe } from 'bey';
import GlobalState from '../../state/global/';
import { actions } from '../../state/history/';


function selectMenuOption(e){
  actions.transitionToMenuOption(e.target.textContent);
}

function MyNavbar({  
  handleToggle,
  isLeftNavOpen,
  setIsLeftNavOpen,
  location
}) {
  return (
    <Subscribe to={GlobalState.state}>
    { state =>
        <React.Fragment>

          <Navbar>
              <Navbar.Group align={Alignment.LEFT}>                  
                <Popover content={
                    <Menu>
                      <MenuItem onClick={selectMenuOption} value={HOME_PATHNAME} text="About"/>
                      <MenuItem onClick={selectMenuOption} value={LIST_PATHNAME} text="List"/>
                      <MenuItem onClick={selectMenuOption} value={ADD_PATHNAME} text="Add Contact"/>
                      <MenuItem onClick={selectMenuOption} value={ADD_GROUP_PATHNAME} text="Add Group"/>
                    </Menu>    
                  } position={Position.RIGHT_TOP}>
                    <Button className="bp3-minimal" icon="menu"/>
                  </Popover>                  
                  <Navbar.Divider />
                  <Navbar.Heading>Contacts app</Navbar.Heading>                  
              </Navbar.Group>
              <Navbar.Group align={Alignment.RIGHT}>
              {
                (location.pathname === LIST_PATHNAME)?
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
