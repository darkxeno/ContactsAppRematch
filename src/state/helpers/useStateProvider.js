
import { useState as reactUseState, useEffect as reactUseEffect, useCallback } from 'react';

export function useMultipleStates(...stateModules) {
  const finalState = [];

  if (stateModules && stateModules.length > 0) {
    stateModules.forEach((module) => {
      const [state, setState] = reactUseState(module.state.get());

      finalState.push(state);

      const handler = useCallback(() => {
        const newState = module.state.get();
        if (newState !== state) {
          setState(newState);
        }
      });

      reactUseEffect(() => {
        module.state.on(handler);
        return function cleanup() {
          module.state.off(handler);
        };
      });
    });

    return finalState;
  }
  throw new Error('useState requires at least one argument.');
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
