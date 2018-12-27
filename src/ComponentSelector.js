import React from "react";
import About from "./containers/About";
import ContactForm from "./containers/ContactForm";
import ContactList from "./containers/ContactList";
import ContactDetail from "./containers/ContactDetail";
import GroupForm from "./containers/GroupForm";


export default function ComponentSelector({ route }) {

    console.log("Changing route:", route);

    if (!route) {
        return <About route={route} />
    }    

    switch(route.name){
      case 'addGroup':
        return <GroupForm route={route} />      
      case 'contactDetails':
        return <ContactDetail route={route} />
      case 'listContacts':
        return <ContactList route={route} />
      case 'editContact':
      case 'addContact':
        return <ContactForm route={route} />
      case 'home':
      default:
        return <About route={route} />
    }

}