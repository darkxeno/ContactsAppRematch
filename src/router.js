import createRouter from 'router5';
import loggerPlugin from 'router5-plugin-logger';
import browserPlugin from 'router5-plugin-browser';
import ContactsState from './state/contacts/';

export const ROUTES = {
  HOME: 'home',
  ADD_CONTACT: 'addContact',
  LIST_CONTACTS: 'listContacts',
  CONTACT_DETAILS: 'contactDetails',
  ADD_GROUP: 'addGroup',
  EDIT_CONTACT: 'editContact',
}

export const routes = [
  { name: ROUTES.HOME, path: '/' },
  { name: ROUTES.ADD_CONTACT, path: '/add' },
  { name: ROUTES.LIST_CONTACTS, path: '/list' },
  { name: ROUTES.EDIT_CONTACT, path: '/edit/:id' },
  { name: ROUTES.CONTACT_DETAILS, path: '/detail/:id' },
  { name: ROUTES.ADD_GROUP, path: '/group/add' }
];

function configureRouter() {
    const router = createRouter(routes, {
      defaultRoute: 'home',
      autoCleanup: false    
    });
    
    // Plugins
    router.usePlugin(
      loggerPlugin,
      browserPlugin({
        useHash: true,
        forceDeactivate: false
      })
    );

    return router;
}

const router = configureRouter();
router.start();

const canDeactivate = (router) => (toState, fromState) => {
  const isContactModified = ContactsState.state.get().current.modified;
  console.log('toState',toState);
  console.log('fromState',fromState,isContactModified);
  return !isContactModified;
}

router.canDeactivate(ROUTES.ADD_CONTACT, canDeactivate);
router.canDeactivate(ROUTES.EDIT_CONTACT, canDeactivate);

export const navigate = router.navigate;
//export const canDeactivate = router.canDeactivate;
export default router;
