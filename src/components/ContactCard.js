import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Elevation, Classes } from "@blueprintjs/core";

const ContactCard = ({ contact, onEditClick, onDeleteClick, big, loading }) => {
  const { name, imgUrl, email, groupNames } = contact;
  const loadingClass = loading ? Classes.SKELETON : '' ;
  return (
    <Card 
      interactive={true} 
      elevation={Elevation.TWO} 
      style={{ width: big ? "auto" : "300px", padding: '0px'}}      
      >

      <div style={{    
        position: 'relative',
        textAlign: 'center',
        height: 300,
        width: 300,        
      }}>
        <h1         
        style={{
          position: 'absolute',
          bottom: '0px',
          right: '0px',
          left: '0px',
          padding: '8px',
          margin: '0',
          color: 'white',
          background: 'rgba(0, 0, 0, 0.54)'          
        }} >
          <span className={ loadingClass }>{name || '...'}</span>
        </h1>
        <img
          alt="contact"
          src={imgUrl || "http://i.imgur.com/mbZIBzc.png"}
          style={{
            maxHeight: 300,
            maxWidth: 300,
          }}
        />
      </div>
      <div style={{ fontSize: "12pt", padding: '8px' }}>
        <span className={loadingClass}>
          { email || '...' }
        </span><br/>
        <span style={{ fontSize: '10pt', color: 'grey' }} className={loadingClass}>
          {groupNames || "Without group"}
        </span>
        
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
