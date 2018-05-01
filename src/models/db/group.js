import {attr, Model} from 'redux-orm';

class Group extends Model {

    static createOrUpdateAll(groupsPayload){
      groupsPayload.forEach(group => {
        this.upsert(group);
      });        
    }

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