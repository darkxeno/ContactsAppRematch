import {many, attr, Model} from 'redux-orm';

class Contact extends Model {

    static get modelName() {
        return 'Contact';
    }  

    static createOrUpdateAll(contactsPayload){
      const { Group } = this.session;
      contactsPayload.forEach(contact => {
        // Only needed for maintaining the groups as inmutable models
        if( contact.groups && contact.groups.length ) {
          contact.groupsRel=contact.groups.map(group => Group.create({id: group}));
        }
        if(this.hasId(contact.id)){
          this.withId(contact.id).update(contact);
        } else {
          this.create(contact);
        }
        
      });        
    }

    toString() {
        return `Contact: ${this.name}`;
    }
    // Declare any static or instance methods you need.
}

// Declare your related fields.
Contact.fields = {
    id: attr(), // non-relational field for any value; optional but highly recommended
    name: attr(),
    email: attr(),
    imgUrl: attr(),
    phoneNumber: attr(),
    groups: attr(),
    groupsRel: many('Group', 'contacts')
};

export default Contact;