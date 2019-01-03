import { update } from 'bey';
import { actions as GlobalActions } from '../global';

function isAsync(fn) {
  return fn.isSync !== true;
  // return fn.constructor.name === 'AsyncFunction';
}

export default function loading(stateModule) {
  if (stateModule.actions && Object.values(stateModule.actions).length > 0) {
    Object.keys(stateModule.actions).forEach((actionName) => {
      if (
        stateModule.actions[actionName]
        && typeof stateModule.actions[actionName] === 'function'
        && isAsync(stateModule.actions[actionName])
      ) {
        const originalAction = stateModule.actions[actionName];

        stateModule.actions[actionName] = async function plusLoading(...args) {
          GlobalActions.setLoading(true, stateModule.name);
          const loadingBefore = stateModule.state.get().loading;
          if (loadingBefore !== true) {
            update(stateModule.state, (state) => {
              state.loading = true;
            });
          }
          const result = await originalAction(...args);
          const loadingAfter = stateModule.state.get().loading;
          if (loadingAfter !== false) {
            update(stateModule.state, (state) => {
              state.loading = false;
            });
          }
          GlobalActions.setLoading(false, stateModule.name);
          return result;
        };
      }
    });
  }

  return stateModule;
}
