import { ORM } from 'redux-orm';
import { Contact, Group } from './index';

const orm = new ORM();
orm.register(Contact, Group);

export default orm;