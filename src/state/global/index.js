import { state as stateCreate, update } from 'bey';
import { actions as SnackbarActions } from '../snackbar';
import { changelog } from '../helpers';

const LIST_MODE = 'list';
const CARD_MODE = 'card';

const mql = window.matchMedia('(min-width: 800px)');

const global = stateCreate({
  loading: { state: false, total: 0, message: null },
  mode: LIST_MODE,
  menu: {
    left: true,
    right: true,
  },
  isSmallScreen: !mql.matches,
});

mql.addListener(() => {
  update(global, (state) => {
    state.isSmallScreen = !mql.matches;
  });
});

function setLoading(loading, message) {
  update(global, (state) => {
    if (loading) {
      state.loading.total += 1;
    } else {
      state.loading.total -= 1;
    }

    state.loading.state = state.loading.total > 0;
    state.loading.message = message;
  });
}

function changeMode(mode) {
  if (mode === LIST_MODE || mode === CARD_MODE) {
    update(global, (state) => {
      state.mode = mode;
    });
    SnackbarActions.setMessage(`Mode changed to: ${mode}`);
  }
}

function toggleLeftMenu() {
  update(global, (state) => {
    state.menu.left = !state.menu.left;
  });
}

function setRightMenuVisibility(visible) {
  update(global, (state) => {
    state.menu.right = visible;
  });
}

function loader(state) {
  return { loading: { state :state.loading.state, message: state.loading.message }};
}

function drawerMenu(state) {
  return { isOpen: state.menu.right, isSmallScreen: state.isSmallScreen };
}

function leftMenu(state) {
  return { isOpen: state.menu.left, isSmallScreen: state.isSmallScreen };
}

const exported = {
  name: 'global',
  state: global,
  actions: {
    setLoading, changeMode, toggleLeftMenu, setRightMenuVisibility,
  },
  selectors: {
    loader, drawerMenu, leftMenu,
  },
};
export const { state, actions, selectors } = exported;
export default changelog(exported);
