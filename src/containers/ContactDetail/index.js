import React, { Component, PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ContactCard from "../../components/ContactCard";
import { EDIT_PATHNAME } from "../../globals/pathNames";
import ContactsState from '../../state/contacts/';
import { Subscribe } from 'bey';

class ContactPage extends PureComponent {
  constructor(props) {
    super(props);
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    ContactsState.actions.loadData(this.props.match.params.id);
  }

  onEditClick() {
    const { transitionToEditContact } = this.props;
    transitionToEditContact( this.props.match.params.id );
  }

  onDeleteClick() {
    const { deleteContact } = this.props;
    deleteContact( this.props.match.params.id );
  }

  render() {
    const contact = this.props.contact;
    return (
      <Subscribe to={ContactsState.state}>
      { contacts => { console.log(contacts); return (
        <div style={{ margin: "1em" }}>
          <ContactCard
            big
            contact={contacts.current}
            onEditClick={this.onEditClick}
            onDeleteClick={this.onDeleteClick}
          />
        </div>
      )}}
      </Subscribe>
    );
  }
}

ContactPage.propTypes = {
  contact: PropTypes.object.isRequired,
  deleteContact: PropTypes.func,
  transitionToEditContact: PropTypes.func
};

const mapStateToProps = (state, props) => ({
  transitionToEditContact: id => props.history.push(`${EDIT_PATHNAME}/${id}`)
});

const mapDispatchToProps = (dispatch, props) => ({
  deleteContact: id => {
    dispatch.contacts.deleteContactRequest(id);
    props.history.goBack();
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);
