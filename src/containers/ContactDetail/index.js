import React, { PureComponent } from 'react';
import { Subscribe } from 'bey';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import ContactCard from '../../components/ContactCard';
import { state as ContactsState, actions as ContactsActions } from '../../state/contacts/';
import { actions as HistoryActions } from '../../state/history/';

const styles = {
  contactDetailRoot: {
    margin: '0.5em 1em',
  },
};

class ContactPage extends PureComponent {
  constructor(props) {
    super(props);
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.transitionToEditContact = HistoryActions.transitionToEditContact;
  }

  componentDidMount() {
    ContactsActions.loadData(this.props.route.params.id);
  }

  componentDidUpdate() {
    ContactsActions.loadData(this.props.route.params.id);
  }

  onEditClick() {
    this.transitionToEditContact(this.props.route.params.id);
  }

  onDeleteClick() {
    ContactsActions.deleteContact(this.props.route.params.id);
  }

  render() {
    return (
      <Subscribe to={ContactsState}>
        {(contacts) =>
          (
            <div className={this.props.classes.contactDetailRoot}>
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

ContactPage.propTypes = {
  route: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(ContactPage);
