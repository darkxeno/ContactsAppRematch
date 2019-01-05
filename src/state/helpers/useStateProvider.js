
import React, { useEffect, useCallback } from 'react';
import { useState, StateInspector } from 'reinspect';
import shallowEqual from 'fbjs/lib/shallowEqual';
import { diffString } from 'json-diff';

React.createElement(StateInspector);

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


function updateStateDeferred(setStateFunction, oldState, newPartialState, moduleName, futureState, componentName, listeners) {
  /* eslint-disable no-param-reassign */
  futureState.changes.push({ oldState, newPartialState, moduleName });
  let timeouts = [];
  timeouts.push(setTimeout(() => {
    if (futureState.changes.length > 0) {
      let newState = { ...futureState.oldState };
      let moduleNameStr = '';
      futureState.changes.forEach((change, i) => {
        moduleNameStr += change.moduleName + ((i !== futureState.changes.length - 1) ? ' + ' : '');
        newState = { ...newState, [change.moduleName]: change.newPartialState };
      });
      executeUpdateState(setStateFunction, oldState, newState, moduleNameStr, futureState.changes.length, componentName, listeners);
      futureState.oldState = newState;
      futureState.changes = [];
      timeouts.forEach((t) => clearTimeout(t));
      timeouts = [];
    }
  }, 0));
}

function executeUpdateState(setStateFunction, oldState, newState, moduleName, totalChanges, componentName, listeners) {
  /* eslint-disable no-console */
  console.groupCollapsed(`[${moduleName}] rendering [${totalChanges}] changes from ${componentName} at: ${new Date().getMilliseconds()}`);
  console.log('NEW STATE: ', newState);
  console.log(diffString(oldState, newState));
  console.groupEnd();
  if (listeners > 0) {
    return setStateFunction(newState);
  }
  return false;
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

    const [state, setState] = useState(mergedState, componentName);

    const futureState = { oldState: state, newState: {}, changes: [] };
    let listeners = 0;
    moduleKeys.forEach((key) => {
      const module = stateModulesObject[key];
      const selector = selectorsObject[key];

      const handler = () => {
        const currentState = module.state.get();
        const newState = (selector) ? selector(currentState) : currentState;
        // console.log('updateStateDeferred', module.name ,new Date().getMilliseconds());
        if (!shallowEqual(newState, state[module.name])) {
          // console.log('updateStateDeferred changed',new Date().getMilliseconds());
          updateStateDeferred(setState, state, newState, module.name, futureState, componentName, listeners);
        }
      };

      useEffect(() => {
        listeners += 1;
        module.state.on(handler);
        return function cleanup() {
          listeners -= 1;
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
