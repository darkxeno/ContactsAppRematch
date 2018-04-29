import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ContactCard from "../../components/ContactCard";
import { EDIT_PATHNAME } from "../../globals/pathNames";
import { makeSelectContactById } from "../../models/contacts/selectors";

class ContactPage extends Component {
  constructor(props) {
    super(props);
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    this.props.initializeView();
  }

  onEditClick() {
    const { contact, transitionToEditContact } = this.props;
    transitionToEditContact(contact.id);
  }

  onDeleteClick() {
    const { contact, deleteContact } = this.props;
    deleteContact(contact.id);
  }

  render() {
    const contact = this.props.contact;
    return (
      <div style={{ margin: "1em" }}>
        <ContactCard
          big
          contact={contact}
          onEditClick={this.onEditClick}
          onDeleteClick={this.onDeleteClick}
        />
      </div>
    );
  }
}

ContactPage.propTypes = {
  contact: PropTypes.object.isRequired,
  deleteContact: PropTypes.func,
  transitionToEditContact: PropTypes.func
};

const mapStateToProps = (state, props) => ({
  contact: makeSelectContactById(props.match.params.id)(state),
  transitionToEditContact: id => props.history.push(`${EDIT_PATHNAME}/${id}`)
});

const mapDispatchToProps = (dispatch, props) => ({
  deleteContact: id => {
    dispatch.contacts.deleteContactRequest(id);
    props.history.goBack();
  },
  initializeView: () => dispatch.contacts.requestContact(props.match.params.id)
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);
