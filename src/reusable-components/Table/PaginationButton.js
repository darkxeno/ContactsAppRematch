
import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Classes } from '@blueprintjs/core';

function PaginationButton(props) {
  return (
    <button type="button" {...props} className={Classes.BUTTON}>
      <Icon icon={props.icon} />
    </button>
  );
}

PaginationButton.propTypes = {
  icon: PropTypes.string.isRequired,
};


export default PaginationButton;
