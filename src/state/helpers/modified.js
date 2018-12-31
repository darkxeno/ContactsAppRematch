import { update } from 'bey';

export default function modified(stateModule) {
  if (stateModule.actions && typeof stateModule.actions === 'object') {
    const initState = stateModule.state.get();
    stateModule.state.set({ ...initState, modified: false });
    stateModule.actions.setModified = function setModified(modifiedFlag) {
      const currentState = stateModule.state.get();
      if (currentState.modified !== modifiedFlag) {
        update(stateModule.state, (state) => {
          state.modified = modifiedFlag;
        });
      }
    };
  }

  return stateModule;
}
