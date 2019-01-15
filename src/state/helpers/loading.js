import { update } from 'bey';
import { actions as GlobalActions } from '../global';

function isAsync(fn) {
  return fn.isSync !== true;
  // return fn.constructor.name === 'AsyncFunction';
}

export default function loading(stateModule, options = { localLoading: false }) {
  if (stateModule.actions && Object.values(stateModule.actions).length > 0) {
    Object.keys(stateModule.actions).forEach((actionName) => {
      if (
        stateModule.actions[actionName]
        && typeof stateModule.actions[actionName] === 'function'
        && isAsync(stateModule.actions[actionName])
      ) {
        const originalAction = stateModule.actions[actionName];
        /* eslint-disable no-param-reassign */
        stateModule.actions[actionName] = async function plusLoading(...args) {
          /* eslint-disable no-console */
          console.groupCollapsed(`[${stateModule.name}] executing action: ${actionName}()`);
          console.log(`Using arguments: ${args}`);
          console.groupEnd();
          GlobalActions.setLoading(true, stateModule.name);
          if (options.localLoading) {
            const loadingBefore = stateModule.state.get().loading;
            if (loadingBefore !== true) {
              update(stateModule.state, (state) => {
                state.loading = true;
              });
            }
          }
          const result = await originalAction(...args);
          if (options.localLoading) {
            const loadingAfter = stateModule.state.get().loading;
            if (loadingAfter !== false) {
              update(stateModule.state, (state) => {
                state.loading = false;
              });
            }
          }
          GlobalActions.setLoading(false, stateModule.name);
          return result;
        };
      }
    });
  }

  return stateModule;
}
