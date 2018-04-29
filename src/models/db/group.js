import {fk, many, attr, Model} from 'redux-orm';

class Group extends Model {
    toString() {
        return `Group: ${this.name}`;
    }
}
Group.modelName = 'Group';

Group.fields = {
    id: attr(),
    name: attr(),
    //contacts: many('Contact', 'groups')
};

export default Group;