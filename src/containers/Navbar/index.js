import React from "react";
import compose from "recompose/compose";
import withStateHandlers from "recompose/withStateHandlers";
import withHandlers from "recompose/withHandlers";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
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


function renderIconElementRight(pathname, changeListMode) {
  if (pathname === LIST_PATHNAME) {
    return <IconElementList changeListMode={GlobalState.actions.changeMode} />;
  }
  return null;
}

function Navbar({
  handleClose,
  handleToggle,
  isLeftNavOpen,
  setIsLeftNavOpen,
  location
}) {
  return (
    <Subscribe to={GlobalState.state}>
    { state =>
        <React.Fragment>
          <AppBar
            title={"Contacts app: "+state.mode}
            onLeftIconButtonClick={handleToggle}
            iconElementRight={renderIconElementRight(
              location.pathname,
              GlobalState.actions.changeMode
            )}
          />
          <Drawer
            open={isLeftNavOpen}
            docked={false}
            onRequestChange={setIsLeftNavOpen}
          >
            <MenuItem onClick={handleClose} value={HOME_PATHNAME}>
              About
            </MenuItem>
            <MenuItem onClick={handleClose} value={LIST_PATHNAME}>
              List
            </MenuItem>
            <MenuItem onClick={handleClose} value={ADD_PATHNAME}>
              Add Contact
            </MenuItem>
            <MenuItem onClick={handleClose} value={ADD_GROUP_PATHNAME}>
              Add Group
            </MenuItem>
          </Drawer>
        </React.Fragment>
    }
    </Subscribe>    
  );
}

export default compose(
  withStateHandlers(
    {
      isLeftNavOpen: false,
    },
    {
      setIsLeftNavOpen: () => (isLeftNavOpen) => ({
        isLeftNavOpen
      }),
      handleToggle: ({ isLeftNavOpen}) => () => ({
        isLeftNavOpen: !isLeftNavOpen,
      })
    }
  ),
  withHandlers({
    handleClose: (props) => (e) => {
      props.setIsLeftNavOpen(false);
      actions.transitionToMenuOption(e.target.textContent);
    }
  }),

)(Navbar);
