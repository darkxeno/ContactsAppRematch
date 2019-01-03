import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function context(stateModule) {
  if (stateModule && typeof stateModule === 'object' && stateModule.state && typeof stateModule.state === 'object') {
    stateModule.context = {};
    const defaultState = stateModule.state.get();
    const Context = React.createContext(defaultState);

    stateModule.context.useContext = function useModuleContext() {
      return useContext(Context);
    };

    stateModule.context.Context = Context;

    // eslint-disable-next-line no-inner-declarations
    function ContextProvider(props) {
      const [state, setState] = useState(stateModule.state.get());

      function handler() {
        const newState = stateModule.state.get();
        if (newState !== state) {
          setState(newState);
        }
      }

      useEffect(() => {
        stateModule.state.on(handler);
        return function cleanup() {
          stateModule.state.off(handler);
        };
      });

      return (
        <Context.Provider value={state}>
          {props.children}
        </Context.Provider>
      );
    }

    ContextProvider.propTypes = {
      children: PropTypes.array.isRequired,
    };

    stateModule.context.Provider = ContextProvider;

    stateModule.context.Consumer = Context.Consumer;
  }

  return stateModule;
}
