import React from 'react';
import { Card, Elevation } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const styles = {
  cardRoot: {
    margin: '1em',
  },
  cardText1stLine: {
    fontSize: '14px',
  },
  cardText2ndLine: {
    paddingTop: '16px',
    fontSize: '14px',
    paddingBottom: '2em',
  },
};

function About({
  classes,
}) {
  return (
    <Card interactive elevation={Elevation.TWO} className={classes.cardRoot}>
      <h1>Contacts App</h1>
      <div className={classes.cardText1stLine}>Learning Immer (Bey)</div>
      <div className={classes.cardText2ndLine}>
        This is a example app using immer and react context + hooks.
      </div>
    </Card>
  );
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(About);
