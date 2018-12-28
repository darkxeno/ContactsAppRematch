import GlobalState from "../global/";
import { update } from 'bey';

function isAsync(fn) {
  return fn.isSync !== true;  
  //return fn.constructor.name === 'AsyncFunction';
}

export default function loading(stateModule){

	if(stateModule.actions && Object.values(stateModule.actions).length > 0){
  	Object.keys(stateModule.actions).forEach(actionName => {
      if(stateModule.actions[actionName] && 
        typeof stateModule.actions[actionName] === 'function' &&
        isAsync(stateModule.actions[actionName]) ){

        const originalAction = stateModule.actions[actionName];

        stateModule.actions[actionName] = async function(...args){
          GlobalState.actions.setLoading(true, stateModule.name);          
          update(stateModule.state, state => { state.loading = true; });
          const result = await originalAction(...args);
          update(stateModule.state, state => { state.loading = false; });
          GlobalState.actions.setLoading(false, stateModule.name);
          return result;
        }   
      }  		
  	});
	}

  return stateModule;
}