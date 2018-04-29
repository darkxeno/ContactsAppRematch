import React, { Component } from "react";
import List from "material-ui/List";
import ListItem from "material-ui/List/ListItem";
import Avatar from "material-ui/Avatar";
import Divider from "material-ui/Divider";
import Subheader from "material-ui/Subheader";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui/svg-icons/action/delete";
import { connect } from "react-redux";
import ContactCard from "../../components/ContactCard";
import { LIST_MODE } from "../../models/contactList/constants";
import { EDIT_PATHNAME, DETAIL_PATHNAME } from "../../globals/pathNames";

class ListContactPage extends Component {
  constructor(props) {
    super(props);
    this.renderContactListItems = this.renderContactListItems.bind(this);
    this.renderContactCardList = this.renderContactCardList.bind(this);
  }

  componentDidMount() {
    this.props.initializeView();
  }

  renderContactListItems() {
    const { list, contacts } = this.props;
    const contactList = [];
    list.forEach(id => {
      const contact = contacts[id];
      contactList.push(
        <ListItem
          key={`contact-${id}`}
          leftAvatar={
            contact.imgUrl ? (
              <Avatar src={contact.imgUrl} />
            ) : (
              <Avatar>{contact.name.substring(0, 1)}</Avatar>
            )
          }
          primaryText={contact.name}
          secondaryText={contact.email}
          secondaryTextLines={1}
          onClick={() => this.props.transitionToContactDetail(id)}
          rightIconButton={
            <IconButton>
              <DeleteIcon onClick={() => this.props.deleteContact(id)} />
            </IconButton>
          }
        />
      );
      contactList.push(<Divider key={`divider-${contact.id}`} inset />);
    });
    return contactList;
  }
  renderContactCardList() {
    const { list, contacts } = this.props;
    const contactList = [];
    list.forEach(id => {
      const contact = contacts[id];
      contactList.push(
        <ContactCard
          key={`contact-${id}`}
          contact={contact}
          onEditClick={() => this.props.transitionToEditContact(id)}
          onDeleteClick={() => this.props.deleteContact(id)}
        />
      );
    });
    return contactList;
  }

  renderContactList() {
    if (this.props.settings.mode === LIST_MODE) {
      return (
        <List>
          <Subheader>Contacts</Subheader>
          {this.renderContactListItems()}
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
        {this.renderContactCardList()}
      </div>
    );
  }
  render() {
    return (
      <div style={{ margin: "0.2em 0 0 0" }}>
        {this.renderContactList()}
      </div>
    );
  }
}

ListContactPage.propTypes = {};

const mapStateToProps = (state, props) => {
  return {
    list: state.contacts.Contact.items,
    contacts: state.contacts.Contact.itemsById,
    settings: state.contactList,
    transitionToEditContact: id => props.history.push(`${EDIT_PATHNAME}/${id}`),
    transitionToContactDetail: id =>
      props.history.push(`${DETAIL_PATHNAME}/${id}`)
  };
};

const mapDispatchToProps = dispatch => ({
  initializeView: () => dispatch.contacts.requestContactList(),
  deleteContact: id => dispatch.contacts.deleteContactRequest(id)
});

export default connect(mapStateToProps, mapDispatchToProps)(ListContactPage);
