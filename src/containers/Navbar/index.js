import React from "react";
import { connect } from "react-redux";
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
  ADD_PATHNAME
} from "../../globals/pathNames";

const textToRouter = {
  List: LIST_PATHNAME,
  About: HOME_PATHNAME,
  "Add Contact": ADD_PATHNAME
};

function renderIconElementRight(pathname, changeListMode) {
  if (pathname === LIST_PATHNAME) {
    return <IconElementList changeListMode={changeListMode} />;
  }
  return null;
}

function Navbar({
  handleClose,
  handleToggle,
  isLeftNavOpen,
  setIsLeftNavOpen,
  changeListMode,
  location
}) {
  return (
    <React.Fragment>
      <AppBar
        title="Contacts app"
        onLeftIconButtonClick={handleToggle}
        iconElementRight={renderIconElementRight(
          location.pathname,
          changeListMode
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
      </Drawer>
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeListMode: (mode) => dispatch.contactList.changeMode(mode),
  };
};

export default compose(
  connect(null, mapDispatchToProps),
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
      props.history.push(textToRouter[e.target.textContent]);
    }
  }),

)(Navbar);
