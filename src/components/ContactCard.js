import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import {
  Button, Card, Elevation, Classes,
} from '@blueprintjs/core';

const styles = {
  // eslint-disable-next-line arrow-body-style
  cardRoot: (props) => {
    return ({
      width: props.big ? 'auto' : '300px',
      padding: props.big ? 'inherit' : '0px',
      '& .bp3-card.bp3-interactive': {
        margin: '1em',
        padding: 0,
      },
    });
  },
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
  cardTextContainer: {
    fontSize: '12pt',
    padding: '8px',
  },
  cardTextGroup: {
    fontSize: '10pt',
    color: 'grey',
  },
  buttonContainer: {
    padding: '8px',
    position: 'relative',
  },
  button: {
    marginRight: '8px',
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
          src={ (name) ? imgUrl || 'http://i.imgur.com/mbZIBzc.png' : 'http://cdn.osxdaily.com/wp-content/uploads/2013/09/deleted-contacts.jpg' }
          className={classes.cardImage}
        />
      </div>
      <div className={classes.cardTextContainer}>
        <span className={loadingClass}>{email || '...'}</span>
        <br />
        <span className={`${classes.cardTextGroup} ${loadingClass}`}>
          {groupNames || 'Without group'}
        </span>
      </div>
      <div className={classes.buttonContainer}>
        <Button onClick={onEditClick} text="Edit" className={classes.button} />
        <Button onClick={onDeleteClick} text="Delete" className={classes.button} />
      </div>
    </Card>
  );
};

ContactCard.propTypes = {
  contact: PropTypes.object.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  big: PropTypes.bool,
  loading: PropTypes.bool,
};

ContactCard.defaultProps = {
  big: false,
  loading: false,
};

export default injectSheet(styles)(ContactCard);
