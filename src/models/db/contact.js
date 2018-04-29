import {many, attr, Model} from 'redux-orm';

class Contact extends Model {
    toString() {
        return `Contact: ${this.name}`;
    }
    // Declare any static or instance methods you need.
}
Contact.modelName = 'Contact';

// Declare your related fields.
Contact.fields = {
    id: attr(), // non-relational field for any value; optional but highly recommended
    name: attr(),
    email: attr(),
    imgUrl: attr(),
    phoneNumber: attr(),
    groups: many('Group', 'contacts')
};

export default Contact;