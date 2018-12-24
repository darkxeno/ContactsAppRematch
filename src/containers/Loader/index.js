import React from "react";
import LinearProgress from "material-ui/LinearProgress";
import { Subscribe } from 'bey';
import GlobalState from '../../state/global/';

function Loader() {
	return (
    <Subscribe to={GlobalState.state}>
    { state => 
    	(state.loading) ?
    	 <LinearProgress mode="indeterminate" /> :
    	 <span style={{ width: "4px" }} />
    }
    </Subscribe>
  );
}

export default Loader;