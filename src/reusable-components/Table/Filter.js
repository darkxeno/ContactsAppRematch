import React from 'react';
import { Classes } from '@blueprintjs/core';
import PropTypes from 'prop-types';

function FilterComponent({
  filter,
  onChange,
  column,
}) {
  return (
    <input
      className={Classes.INPUT}
      type="text"
      style={{
        width: '100%',
      }}
      placeholder={column.Placeholder}
      value={filter ? filter.value : ''}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

FilterComponent.propTypes = {
  column: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};


export default FilterComponent;
