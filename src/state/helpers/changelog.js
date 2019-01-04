import { original } from 'immer';
import { diffString } from 'json-diff';
import { state as stateCreate, update } from 'bey';

const changelogs = stateCreate({});

export default function changelog(stateModule) {
  if (stateModule.actions && typeof stateModule.actions === 'object') {
    const key = stateModule.name || Symbol('state module name is not defined');

    changelogs.set({
      ...changelogs.get(),
      [key]: { changes: [] },
    });

    stateModule.state.on(() => {
      const newState = stateModule.state.get();
      update(changelogs, (state) => {
        const previousSnap = state[key].changes[state[key].changes.length - 1];
        const previousValue = previousSnap ? original(previousSnap).snapshot : undefined;
        state[key].changes.push({ snapshot: newState, updatedAt: Date.now() });
        /* eslint-disable no-console */
        console.groupCollapsed(`[${key}] state changed at ${new Date().getMilliseconds()}`); // at ${new Date().getMilliseconds()}
        console.log('FROM:', previousValue);
        console.log('TO:', newState);
        console.log('DIFF:');
        console.log(diffString(previousValue, newState));
        console.groupEnd();
      });
    });
  }

  return stateModule;
}
