import React, { PureComponent } from "react";
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
    this.transitionToEditContact = id => props.history.push(`${EDIT_PATHNAME}/${id}`)
  }

  componentDidMount() {
    ContactsState.actions.loadData(this.props.match.params.id);
  }

  onEditClick() {
    this.transitionToEditContact( this.props.match.params.id );
  }

  onDeleteClick() {
    ContactsState.actions.deleteContact( this.props.match.params.id );
  }

  render() {
    const contact = this.props.contact;
    return (
      <Subscribe to={ContactsState.state}>
      { contacts => { return (
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


export default ContactPage;
