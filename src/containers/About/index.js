import React from "react";
import { Card, Elevation } from "@blueprintjs/core";

export default function About() {
  return (    
    <Card interactive={true} elevation={Elevation.TWO} style={{ margin: "1em" }}>
      <h1>Contacts App</h1>
      <div style={{ fontSize: '14px'}}>
      	Learning Immer (Bey)
      </div>
      <div style={{ paddingTop: '16px', fontSize: '14px', paddingBottom: '2em' }}>
		    This is a example app using immer and react context + hooks.
      </div>
    </Card>    
  );
}
