import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Button, Card, Elevation, Classes } from '@blueprintjs/core';

const styles = {
  cardRoot: (props) => (props.big ?
    { width: 'auto' } :
    { width: '300px', padding: '0px' }
  ),
  cardContentContainer: {
    position: 'relative',
    textAlign: 'center',
    height: 300,
    width: 300,
  },
  cardHeader: {
    position: 'absolute',
    bottom: '0px',
    right: '0px',
    left: '0px',
    padding: '8px',
    margin: '0',
    color: 'white',
    background: 'rgba(0, 0, 0, 0.54)',
  },
  cardImage: {
    maxHeight: 300,
    maxWidth: 300,
  },
};

const ContactCard = ({
  // eslint-disable-next-line no-unused-vars
  contact, onEditClick, onDeleteClick, big, loading, classes,
}) => {
  const {
    name, imgUrl, email, groupNames,
  } = contact;
  const loadingClass = loading ? Classes.SKELETON : '';
  return (
    <Card
      interactive
      elevation={Elevation.TWO}
      className={classes.cardRoot}
    >
      <div className={classes.cardContentContainer}>
        <h1 className={classes.cardHeader}>
          <span className={loadingClass}>{name || '...'}</span>
        </h1>
        <img
          alt="contact"
          src={imgUrl || 'http://i.imgur.com/mbZIBzc.png'}
          className={classes.cardImage}
        />
      </div>
      <div style={{ fontSize: '12pt', padding: '8px' }}>
        <span className={loadingClass}>{email || '...'}</span>
        <br />
        <span style={{ fontSize: '10pt', color: 'grey' }} className={loadingClass}>
          {groupNames || 'Without group'}
        </span>
      </div>
      <div style={{ padding: '8px', position: 'relative' }}>
        <Button onClick={onEditClick} text="Edit" style={{ marginRight: '8px' }} />
        <Button onClick={onDeleteClick} text="Delete" style={{ marginRight: '8px' }} />
      </div>
    </Card>
  );
};

ContactCard.propTypes = {
  contact: PropTypes.object.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  big: PropTypes.boolean,
  loading: PropTypes.boolean,
};

ContactCard.defaultProps = {
  big: false,
  loading: false,
};

export default injectSheet(styles)(ContactCard);
