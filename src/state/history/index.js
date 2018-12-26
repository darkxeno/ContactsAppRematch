import { navigate } from "@reach/router";
import { 
  EDIT_PATHNAME, 
  DETAIL_PATHNAME, 
  HOME_PATHNAME,
  LIST_PATHNAME,
  ADD_PATHNAME,
  ADD_GROUP_PATHNAME 
} from "../../globals/pathNames";

const textToRouter = {
  List: LIST_PATHNAME,
  About: HOME_PATHNAME,
  "Add Contact": ADD_PATHNAME,
  "Add Group": ADD_GROUP_PATHNAME
};

export const actions = {
	transitionToEditContact: (id) => navigate(`${EDIT_PATHNAME}/${id}`),
	transitionToContactDetail: (id) => navigate(`${DETAIL_PATHNAME}/${id}`),
  transitionToMenuOption: text => navigate(textToRouter[text]),
};

const exported = { 
  name: 'history',
  history: { 
    goBack:()=>window.history.back()
  }, 
  actions 
};
export const history = exported.history;
export default exported;