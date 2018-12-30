import { update } from 'bey';

export default function modified(stateModule) {
  if (stateModule.actions && typeof stateModule.actions === 'object') {
    const state = stateModule.state.get();
    stateModule.state.set({ ...state, modified: false });
    stateModule.actions.setModified = function setModified(modified) {
      const state = stateModule.state.get();
      if (state.modified !== modified) {
        update(stateModule.state, (state) => {
          state.modified = modified;
        });
      }
    };
  }

  return stateModule;
}
