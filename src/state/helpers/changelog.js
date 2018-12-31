import { original } from 'immer';
import { state as stateCreate, update } from 'bey';

const changelogs = stateCreate({
  changelogs: {},
});

export default function changelog(stateModule) {
  if (stateModule.actions && typeof stateModule.actions === 'object') {
    const key = stateModule.name || Symbol('state module name is not defined');

    changelogs.set({
      [key]: { changes: [] },
    });

    stateModule.state.on(() => {
      const newState = stateModule.state.get();
      update(changelogs, (state) => {
        const previousSnap = state[key].changes[state[key].changes.length - 1];
        const previousValue = previousSnap ? original(previousSnap).snapshot : undefined;
        state[key].changes.push({ snapshot: newState, updatedAt: Date.now() });
        // eslint-disable-next-line no-console
        console.log(`[${key}] state changed from:`, previousValue, '\nto:\n', newState);
      });
    });
  }

  return stateModule;
}
