import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import compose from "recompose/compose";
import withHandlers from "recompose/withHandlers";
import lifecycle from "recompose/lifecycle";
import List from "material-ui/List";
import ListItem from "material-ui/List/ListItem";
import Avatar from "material-ui/Avatar";
import Divider from "material-ui/Divider";
import Subheader from "material-ui/Subheader";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui/svg-icons/action/delete";
import ContactCard from "../../components/ContactCard";
import { LIST_MODE } from "../../models/contactList/constants";
import { EDIT_PATHNAME, DETAIL_PATHNAME } from "../../globals/pathNames";
import selectContactListDomain from "../../models/contactList/selectors";
import { makeSelectContactListPopulated } from "../../models/contacts/selectors";

function ListContactPage(props) {
  return (
    <div style={{ margin: "0.2em 0 0 0" }}>{props.renderContactList()}</div>
  );
}

ListContactPage.propTypes = {
  renderContactList: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  contacts: makeSelectContactListPopulated(),
  settings: selectContactListDomain()
});

const mapDispatchToProps = dispatch => ({
  initializeView: () => dispatch.contacts.requestContactList(),
  deleteContact: id => dispatch.contacts.deleteContactRequest(id)
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    transitionToEditContact: props => id =>
      props.history.push(`${EDIT_PATHNAME}/${id}`),
    transitionToContactDetail: props => id =>
      props.history.push(`${DETAIL_PATHNAME}/${id}`)
  }),
  withHandlers({
    renderContactListItems: props => () =>
      props.contacts.map(contact => (
        <div key={`contact-${contact.id}`}>
          <ListItem
            leftAvatar={
              contact.imgUrl ? (
                <Avatar src={contact.imgUrl} />
              ) : (
                <Avatar>{contact.name.substring(0, 1)}</Avatar>
              )
            }
            primaryText={contact.name}
            secondaryText={contact.groups || "Without group"}
            secondaryTextLines={1}
            onClick={() => props.transitionToContactDetail(contact.id)}
            rightIconButton={
              <IconButton>
                <DeleteIcon onClick={() => props.deleteContact(contact.id)} />
              </IconButton>
            }
          />
          <Divider key={`divider-${contact.id}`} inset />
        </div>
      )),
    renderContactCardList: props => () =>
      props.contacts.map(contact => (
        <ContactCard
          key={`contact-${contact.id}`}
          contact={contact}
          onEditClick={() => props.transitionToEditContact(contact.id)}
          onDeleteClick={() => props.deleteContact(contact.id)}
        />
      ))
  }),
  withHandlers({
    renderContactList: props => () => {
      console.log(props.settings.mode);
      if (props.settings.mode === LIST_MODE) {
        return (
          <List>
            <Subheader>Contacts</Subheader>
            {props.renderContactListItems()}
          </List>
        );
      }
      return (
        <div
          style={{
            display: "flex",
            flex: "0 0 auto",
            flexWrap: "wrap",
            margin: "1em",
            justifyContent: "space-between"
          }}
        >
          {props.renderContactCardList()}
        </div>
      );
    }
  }),
  lifecycle({
    componentDidMount() {
      this.props.initializeView();
    }
  })
)(ListContactPage);
