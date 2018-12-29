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
    ContactsState.actions.loadData(this.props.route.params.id);
  }

  componentDidUpdate() {
    ContactsState.actions.loadData(this.props.route.params.id);
  }

  onEditClick() {
    this.transitionToEditContact( this.props.route.params.id );
  }

  onDeleteClick() {
    ContactsState.actions.deleteContact( this.props.route.params.id );
  } 

  render() {
    return (
      <Subscribe to={ContactsState.state}>
      { contacts => { 
        //return (contacts.current && contacts.current.name)?
          return (<div style={{ margin: "0.5em 1em" }}>
            <ContactCard
              big              
              contact={contacts.current}
              loading={contacts.loading}
              onEditClick={this.onEditClick}
              onDeleteClick={this.onDeleteClick}
            />            
          </div>)//:null
      }}
      </Subscribe>
    );
  }
}


export default ContactPage;
