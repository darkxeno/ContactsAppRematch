import { useEffect, useState, default as React } from "react";
import Sidebar from "react-sidebar";
import { Button } from "@blueprintjs/core";
import GlobalState from '../../state/global/';


const mql = window.matchMedia(`(min-width: 800px)`);

export default function DrawerMenu(props){

  const [state, setState] = useState({ isSmallScreen: !mql.matches, isOpen: true });

  function mediaQueryChanged(){    
    setState({...state, isSmallScreen: !mql.matches});
  }

  function isOpenChanged(){
    const isOpen = GlobalState.state.get().menu.right;
    if(isOpen !== state.isOpen){
      setState({...state, isOpen });
    }
  }  

  useEffect(() => {    
    mql.addListener(mediaQueryChanged);
    GlobalState.state.on(isOpenChanged);
    return function cleanup() {
      mql.removeListener(mediaQueryChanged);
      GlobalState.state.off(isOpenChanged);
    };    
  });     

  const isOpen = state.isOpen;

  if(!state.isSmallScreen){
    return props.children;
  } else {
    return (
      (true || state.isOpen)?<Sidebar
        open={isOpen}
        pullRight={true}
        styles={{ root: { position: 'initial'}, content: {display: 'none'}, overlay: { display: 'none'}, sidebar: {background:'#30404d', paddingTop: '3.5rem'}}}
        onSetOpen={(open)=>{
          console.log('open',open);
          GlobalState.actions.setRightMenuVisibility(open);
        }}
        sidebar={
          <div>
            <Button className="bp3-minimal" icon="cross" onClick={()=>GlobalState.actions.setRightMenuVisibility(false)} />
            {props.children}
          </div>
        }>
        {<Button className="bp3-minimal" icon="menu" onClick={()=>GlobalState.actions.setRightMenuVisibility(!isOpen)} />}        
      </Sidebar>:null
    )
  }
}