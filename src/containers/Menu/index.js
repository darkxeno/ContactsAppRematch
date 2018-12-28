import { useState, default as React } from "react";
import { Menu, MenuItem } from "@blueprintjs/core";
import { actions } from '../../state/history/';
import GlobalState from '../../state/global/';
import { Subscribe } from 'bey';

function selectMenuOption(e){
  actions.transitionToMenuOption(e.target.textContent);
}

export default function LeftMenu(props){

  const [selected, setSelected] = useState(1);

  return (
    <Subscribe to={GlobalState.state} on={state=>state.menu.visible}>
    {(visible) => 
      (visible)?
      <Menu className="leftMenu">
        <MenuItem 
          active={selected===1} 
          onClick={(e)=>{ selectMenuOption(e); setSelected(1); }}
          text="About"/>
        <MenuItem 
          active={selected===2} 
          onClick={(e)=>{ selectMenuOption(e); setSelected(2); }} 
          text="List"/>
        <MenuItem 
         active={selected===3} 
         onClick={(e)=>{ selectMenuOption(e); setSelected(3); }} 
         text="Add Contact"/>
        <MenuItem 
         active={selected===4} 
         onClick={(e)=>{ selectMenuOption(e); setSelected(4); }}       
         text="Add Group"/>
      </Menu>:null
    }
    </Subscribe>    
  );
}