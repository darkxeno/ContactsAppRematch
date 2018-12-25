import React from "react";
import { Card, Elevation } from "@blueprintjs/core";

export default function About() {
  return (
    <Card interactive={true} elevation={Elevation.TWO} style={{ margin: "1em" }}>
      <h1>Contacts App</h1>
      <div style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.54)' }}>
      	Learning Immer (Bey)
      </div>
      <div style={{ paddingTop: '16px', fontSize: '14px', color: 'rgba(0, 0, 0, 0.87)' }}>
		This is a example app using immer and react context + hooks.
      </div>
    </Card>
  );
}
