import { original } from 'immer';
import { state, update } from 'bey';

const changelogs = state({
  changelogs: {},
});

export default function changelog(stateModule) {
  if (stateModule.actions && typeof stateModule.actions === 'object') {
    const key = stateModule.name || Symbol();

    changelogs.set({
      [key]: { changes: [] },
    });

    stateModule.state.on(function() {
      const newState = stateModule.state.get();
      update(changelogs, state => {
        const previousSnap = state[key].changes[state[key].changes.length - 1];
        const previousValue = previousSnap ? original(previousSnap).snapshot : undefined;
        state[key].changes.push({ snapshot: newState, updatedAt: Date.now() });
        console.log(`[${key}] state changed from:`, previousValue, '\nto:\n', newState);
      });
    });
  }

  return stateModule;
}
