import React, { PureComponent } from 'react';
import { Subscribe } from 'bey';
import ContactCard from '../../components/ContactCard';
import ContactsState from '../../state/contacts/';
import { actions as HistoryActions } from '../../state/history/';


class ContactPage extends PureComponent {
  constructor(props) {
    super(props);
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.transitionToEditContact = HistoryActions.transitionToEditContact;
  }

  componentDidMount() {
    ContactsState.actions.loadData(this.props.route.params.id);
  }

  componentDidUpdate() {
    ContactsState.actions.loadData(this.props.route.params.id);
  }

  onEditClick() {
    this.transitionToEditContact(this.props.route.params.id);
  }

  onDeleteClick() {
    ContactsState.actions.deleteContact(this.props.route.params.id);
  }

  render() {
    return (
      <Subscribe to={ContactsState.state}>
        {(contacts) =>
          (
            <div style={{ margin: '0.5em 1em' }}>
              <ContactCard
                big
                contact={contacts.current}
                loading={contacts.loading}
                onEditClick={this.onEditClick}
                onDeleteClick={this.onDeleteClick}
              />
            </div>
          )
        }
      </Subscribe>
    );
  }
}

export default ContactPage;
