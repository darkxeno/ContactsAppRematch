import React, { PureComponent } from "react";
import ContactCard from "../../components/ContactCard";
import ContactsState from '../../state/contacts/';
import { actions } from '../../state/history/';
import { Subscribe } from 'bey';

class ContactPage extends PureComponent {
  constructor(props) {
    super(props);
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.transitionToEditContact = actions.transitionToEditContact;
  }

  componentDidMount() {
    ContactsState.actions.loadData(this.props.id);
  }

  onEditClick() {
    this.transitionToEditContact( this.props.id );
  }

  onDeleteClick() {
    ContactsState.actions.deleteContact( this.props.id );
  } 

  render() {
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
