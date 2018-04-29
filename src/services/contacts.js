import * as firebase from "firebase";

const BASE_URL = "/jony";

const config = {
  apiKey: "AIzaSyB1GATIyuA6FNnAUMBz0kXJ62EvlSWx99o",
  authDomain: "redux-contacts-app.firebaseapp.com",
  databaseURL: "https://redux-contacts-app.firebaseio.com/"
};

firebase.initializeApp(config);

export function getContactsService() {
  const firebaseConnection = firebase.database().ref(`${BASE_URL}`);
  return new Promise((resolve, reject) => {
    firebaseConnection.once(
      "value",
      contactsDB => {
        const contactsDBValue = contactsDB.val();
        const contacts = [];
        Object.keys(contactsDBValue).map((id) =>
          contacts.push({
            id,
            ...contactsDBValue[id]
          })
        );
        return resolve(contacts);
      },
      err => reject(err)
    );
  });
}

export function getContactService(id) {
  const firebaseConnection = firebase.database().ref(`${BASE_URL}/${id}`);
  return new Promise((resolve, reject) => {
    firebaseConnection.once(
      "value",
      contactDB => {
        const contactDBValue = contactDB.val();
        contactDBValue.id = id;
        return resolve(contactDBValue);
      },
      err => reject(err)
    );
  });
}

export function postContactService(contact) {
  const firebaseConnection = firebase.database().ref(`${BASE_URL}`);
  return new Promise((resolve, reject) => {
    const post = firebaseConnection.push();
    post.set(contact, err => {
      if (err) {
        return reject(err);
      }
      return resolve({
        id: post.key,
        ...contact,
      });
    });
  });
}

export function updateContactService({ id, ...others }) {
  const firebaseConnection = firebase.database().ref(`${BASE_URL}/${id}`);
  return new Promise((resolve, reject) => {
    firebaseConnection.set({ ...others }, err => {
      if (err) {
        return reject(err);
      }
      return resolve({
        id,
        ...others
      });
    });
  });
}

export function deleteContactService(id) {
  const firebaseConnection = firebase.database().ref(`${BASE_URL}/${id}`);
  return new Promise((resolve, reject) => {
    firebaseConnection.set(null, err => {
      if (err) {
        return reject(err);
      }
      return resolve({ id });
    });
  });
}
