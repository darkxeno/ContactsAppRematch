import { createBrowserHistory } from 'history';
import { 
  EDIT_PATHNAME, 
  DETAIL_PATHNAME, 
  HOME_PATHNAME,
  LIST_PATHNAME,
  ADD_PATHNAME,
  ADD_GROUP_PATHNAME 
} from "../../globals/pathNames";

export const history = createBrowserHistory();

const textToRouter = {
  List: LIST_PATHNAME,
  About: HOME_PATHNAME,
  "Add Contact": ADD_PATHNAME,
  "Add Group": ADD_GROUP_PATHNAME
};

export const actions = {
	transitionToEditContact: (id) => history.push(`${EDIT_PATHNAME}/${id}`),
	transitionToContactDetail: (id) => history.push(`${DETAIL_PATHNAME}/${id}`),
  transitionToMenuOption: text => history.push(textToRouter[text]),
};

export default { history, actions };