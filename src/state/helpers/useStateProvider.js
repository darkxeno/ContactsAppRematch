
import { useState, useEffect, useCallback } from 'react';
import shallowEqual from 'fbjs/lib/shallowEqual';
import { diffString } from 'json-diff';

export function useMultipleStates(...stateModules) {
  const finalState = [];

  if (stateModules && stateModules.length > 0) {
    stateModules.forEach((module) => {
      const [state, setState] = useState(module.state.get());

      finalState.push(state);

      const handler = useCallback(() => {
        const newState = module.state.get();
        if (newState !== state) {
          setState(newState);
        }
      });

      useEffect(() => {
        module.state.on(handler);
        return function cleanup() {
          module.state.off(handler);
        };
      });
    });

    return finalState;
  }
  throw new Error('useMultipleStates requires at least one argument.');
}


function updateStateDeferred(setStateFunction, oldState, newPartialState, moduleName, futureState, componentName) {
  futureState.changes.push({ oldState, newPartialState, moduleName });
  setTimeout(() => {
    if (futureState.changes.length > 0) {
      let newState = { ...futureState.oldState };
      let moduleNameStr = '';
      futureState.changes.forEach((change, i) => {
        moduleNameStr += change.moduleName + ((i !== futureState.changes.length - 1) ? ' + ' : '');
        newState = { ...newState, [change.moduleName]: change.newPartialState };
      });
      executeUpdateState(setStateFunction, oldState, newState, moduleNameStr, futureState.changes.length, componentName);
      futureState.oldState = newState;
      futureState.changes = [];
    }
  }, 0);
}

function executeUpdateState(setStateFunction, oldState, newState, moduleName, totalChanges, componentName) {
  /* eslint-disable no-console */
  console.groupCollapsed(`[${moduleName}] rendering [${totalChanges}] changes from ${componentName}`);
  console.log('NEW STATE: ', newState);
  console.log(diffString(oldState, newState));
  console.groupEnd();
  return setStateFunction(newState);
}

export function useMultiple(stateModulesObject, selectorsObject = {}, componentName) {
  let mergedState = {};

  if (stateModulesObject && typeof stateModulesObject === 'object' && Object.keys(stateModulesObject).length > 0) {
    const moduleKeys = Object.keys(stateModulesObject);
    moduleKeys.forEach((key) => {
      const module = stateModulesObject[key];
      const state = module.state.get();
      const selector = selectorsObject[key];
      mergedState = { ...mergedState, [module.name]: (selector) ? selector(state) : state };
    });

    const [state, setState] = useState(mergedState);

    const futureState = { oldState: state, newState: {}, changes: [] };

    moduleKeys.forEach((key) => {
      const module = stateModulesObject[key];
      const selector = selectorsObject[key];

      const handler = () => {
        const currentState = module.state.get();
        const newState = (selector) ? selector(currentState) : currentState;
        if (!shallowEqual(newState, state[module.name])) {
          updateStateDeferred(setState, state, newState, module.name, futureState, componentName);
        }
      };

      useEffect(() => {
        module.state.on(handler);
        return function cleanup() {
          module.state.off(handler);
        };
      });
    });

    return state;
  }
  throw new Error('useMultiple requires at least one object argument with one moduleState key.');
}

export default function useStateProvider(stateModule) {
  if (stateModule && typeof stateModule === 'object' && stateModule.state && typeof stateModule.state === 'object') {
    stateModule.state.useState = function useStateHook(...modules) {
      if (modules) {
        return useMultipleStates(...modules);
      }
      return useMultipleStates(stateModule);
    };
  }

  return stateModule;
}