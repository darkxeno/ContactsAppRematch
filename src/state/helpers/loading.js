import GlobalState from "../global/";
import { update } from 'bey';

export default function loading(stateModule){

	if(stateModule.actions && Object.values(stateModule.actions).length > 0){
  	Object.keys(stateModule.actions).forEach(actionName => {
      if(stateModule.actions[actionName] && typeof stateModule.actions[actionName] === 'function' ){
        //const oldName = action.name;
        const originalAction = stateModule.actions[actionName];
        stateModule.actions[actionName] = async function(...args){
          //console.log('loading true');          
          GlobalState.actions.setLoading(true, stateModule.name);          
          update(stateModule.state, state => { state.loading = true; });
          const result = await originalAction(...args);
          update(stateModule.state, state => { state.loading = false; });
          GlobalState.actions.setLoading(false, stateModule.name);
          //console.log('loading false');
          return result;
        }
        //action.name = oldName + "Loading";     
      }  		
  	});
	}

  return stateModule;
}