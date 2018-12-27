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