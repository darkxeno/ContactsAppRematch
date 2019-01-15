import React from 'react';
import PropTypes from 'prop-types';
import {
  MenuItem, Menu, Popover, Button, Position,
} from '@blueprintjs/core';

const IconElementList = ({ changeListMode }) => (
  <Popover
    content={(
      <Menu>
        <MenuItem text="List" onClick={() => changeListMode('list')} />
        <MenuItem text="Card" onClick={() => changeListMode('card')} />
        <MenuItem text="Table" onClick={() => changeListMode('table')} />
      </Menu>
    )}
    position={Position.RIGHT_TOP}
  >
    <Button icon="more" />
  </Popover>
);

IconElementList.propTypes = {
  changeListMode: PropTypes.func.isRequired,
};

export default IconElementList;
