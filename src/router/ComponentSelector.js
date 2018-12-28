import React from "react";
import About from "../containers/About";
import ContactForm from "../containers/ContactForm";
import ContactList from "../containers/ContactList";
import ContactDetail from "../containers/ContactDetail";
import GroupForm from "../containers/GroupForm";
import { ROUTES } from "./routes";

export default function ComponentSelector({ route, router }) {

    //console.log("Changing route:", route);

    if (!route) {
        return <About route={route} />
    }    

    switch(route.name){
      case ROUTES.ADD_GROUP:
        return <GroupForm route={route} />      
      case ROUTES.CONTACT_DETAILS:
        return <ContactDetail route={route} />
      case ROUTES.LIST_CONTACTS:
        return <ContactList route={route} />
      case ROUTES.EDIT_CONTACT:
      case ROUTES.ADD_CONTACT:
        return <ContactForm route={route} router={router} />
      case ROUTES.HOME:
      default:
        return <About route={route} />
    }

}