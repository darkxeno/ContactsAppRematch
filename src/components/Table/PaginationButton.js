
import React from 'react';
import PropTypes from 'prop-types';
import { Classes } from '@blueprintjs/core';

function PaginationButton(props) {
  return (
    <button type="button" {...props} className={Classes.BUTTON}>
      {props.children}
    </button>
  );
}

PaginationButton.propTypes = {
  children: PropTypes.string.isRequired,
};


export default PaginationButton;
