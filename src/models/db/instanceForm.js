import {attr, Model} from 'redux-orm';

class InstanceForm extends Model {

    static createOrUpdateAll(InstanceFormsPayload){
      InstanceFormsPayload.forEach(InstanceForm => {
        this.upsert(InstanceForm);
      });        
    }

    toString() {
        return `InstanceForm: ${this.name}`;
    }
}
InstanceForm.modelName = 'InstanceForm';

InstanceForm.fields = {
    id: attr(),
    name: attr()
};

export default Group;