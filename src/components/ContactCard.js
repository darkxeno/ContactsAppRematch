import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Elevation } from "@blueprintjs/core";

const ContactCard = ({ contact, onEditClick, onDeleteClick, big }) => {
  const { name, imgUrl, email, groupNames } = contact;
  return (
    <Card 
      interactive={true} 
      elevation={Elevation.TWO} 
      style={{ width: big ? "auto" : "300px", padding: '0px'}}>

      <div style={{    
        position: 'relative',
        textAlign: 'center'
      }}>
        <h1 style={{
          position: 'absolute',
          bottom: '0px',
          right: '0px',
          left: '0px',
          padding: '8px',
          margin: '0',
          color: 'white',
          background: 'rgba(0, 0, 0, 0.54)'          
        }} >{name}</h1>
        <img
          alt="contact"
          src={imgUrl || "http://i.imgur.com/mbZIBzc.png"}
          style={{
            height: "auto",
            width: "auto",
            maxWidth: 300,
            minWidth: 300,
            maxHeight: 300
          }}
        />
      </div>
      <div style={{ fontSize: "12pt", padding: '8px' }}>
        {email}
        <div style={{ fontSize: '10pt', color: 'grey' }}>
          {groupNames || "Without group"}
        </div>
      </div>
      <div style={{padding: '8px', position: 'relative'}}>
        <Button onClick={onEditClick} text="Edit" style={{marginRight:'8px'}} />
        <Button onClick={onDeleteClick} text="Delete" style={{marginRight:'8px'}} />
      </div>
    </Card>
  );
};

ContactCard.propTypes = {
  contact: PropTypes.object,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func
};

export default ContactCard;
