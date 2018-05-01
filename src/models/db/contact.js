import {many, attr, Model} from 'redux-orm';

class Contact extends Model {

    static get modelName() {
        return 'Contact';
    }  

    static createOrUpdateAll(contactsPayload){
      contactsPayload.forEach(contact => {
        contact.groupsRel=contact.groups;
        this.upsert(contact);
      });        
    }

    toString() {
        return `Contact: ${this.name}`;
    }
}

Contact.fields = {
    id: attr(),
    name: attr(),
    email: attr(),
    imgUrl: attr(),
    phoneNumber: attr(),
    groups: attr(),
    groupsRel: many('Group', 'contacts')
};

export default Contact;