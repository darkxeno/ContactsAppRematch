import {attr, Model} from 'redux-orm';

class Group extends Model {
    toString() {
        return `Group: ${this.name}`;
    }
}
Group.modelName = 'Group';

Group.fields = {
    id: attr(),
    name: attr()
};

export default Group;