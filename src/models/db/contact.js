import {many, attr, Model} from 'redux-orm';

class Contact extends Model {

    static get modelName() {
        return 'Contact';
    }  

    static createOrUpdateAll(contactsPayload, Group){
      contactsPayload.forEach(contact => {
        // addded group id validations        
        if(contact.groups && contact.groups.length > 0){
          contact.groupsRel=contact.groups.filter((groupId)=>Group.hasId(groupId));
        }
        this.upsert(contact);
      });        
    }

    static toRefArrayPopulated() {
      return this.all().toModelArray().map(contact=>{
        return { 
          ...contact.ref, 
          groups: contact.groupsRel.toRefArray().map(g=>g.name).join(', ')
        };
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