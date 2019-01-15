import React from 'react';
import { Classes } from '@blueprintjs/core';
import PropTypes from 'prop-types';

function SelectInput({
  checked,
  selectType,
  id,
  row,
  onClick,
}) {
  return (
    <input
      className={Classes.CHECKBOX}
      type={selectType}
      checked={checked}
      onClick={(e) => {
        const { shiftKey } = e;
        e.stopPropagation();
        onClick(id, shiftKey, row);
      }}
      onChange={() => {}}
    />
  );
}

SelectInput.propTypes = {
  selectType: PropTypes.string,
  checked: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  row: PropTypes.object,
  id: PropTypes.any,
};

SelectInput.defaultProps = {
  selectType: 'checkbox',
  checked: false,
  row: {},
  id: undefined,
};

export default SelectInput;
