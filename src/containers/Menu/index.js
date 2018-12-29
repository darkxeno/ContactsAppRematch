import { useState, default as React } from "react";
import { Menu, MenuItem } from "@blueprintjs/core";
import { actions } from '../../state/history/';
import GlobalState from '../../state/global/';
import { Subscribe } from 'bey';
import { ROUTES } from '../../router/routes';

function selectMenuOption(e){
  actions.transitionToMenuOption(e.target.textContent);
}

export default function LeftMenu(props){
  return (
    <Subscribe to={GlobalState.state} on={state=>state.menu.visible}>
    {(visible) => 
      (visible)?
      <Menu className="leftMenu">
        <MenuItem 
          active={props.route.name===ROUTES.HOME} 
          onClick={(e)=>{ selectMenuOption(e); }}
          text="About"/>
        <MenuItem 
          active={[ROUTES.LIST_CONTACTS, ROUTES.CONTACT_DETAILS, ROUTES.EDIT_CONTACT].indexOf(props.route.name)!==-1} 
          onClick={(e)=>{ selectMenuOption(e); }} 
          text="List"/>
        <MenuItem 
         active={props.route.name===ROUTES.ADD_CONTACT}  
         onClick={(e)=>{ selectMenuOption(e); }} 
         text="Add Contact"/>
        <MenuItem 
         active={props.route.name===ROUTES.ADD_GROUP}  
         onClick={(e)=>{ selectMenuOption(e); }}       
         text="Add Group"/>
      </Menu>:null
    }
    </Subscribe>    
  );
}