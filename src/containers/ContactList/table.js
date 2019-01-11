import React from 'react';
import ReactTable, { ReactTableDefaults } from 'react-table';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { Icon, Tag, Classes } from '@blueprintjs/core';

// console.log('ReactTableDefaults', ReactTableDefaults);

function PaginationButton(props) {
  return (
    <button type="button" {...props} className={Classes.BUTTON}>
      {props.children}
    </button>
  );
}

PaginationButton.propTypes = {
  children: PropTypes.array.isRequired,
};

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

Object.assign(ReactTableDefaults, {
  FilterComponent,
  PreviousComponent: PaginationButton,
  NextComponent: PaginationButton,
});

const columns = [{
  Header: 'Name',
  accessor: 'name',
  Placeholder: 'Search by name...',
}, {
  Header: 'Email',
  accessor: 'email',
  Placeholder: 'Search by email...',
  Cell: (cellProps) => (
    <span className="email">
      <Icon icon="envelope" />
      {`  ${cellProps.value}`}
    </span>
  ),
}, {
  Header: 'Phone Number',
  accessor: 'phoneNumber',
  Placeholder: 'Search by phone number...',
  Cell: (cellProps) => (
    (cellProps.value)
      ? (
        <span className="phoneNumber">
          <Icon icon="phone" />
          {`  ${cellProps.value}`}
        </span>
      ) : false),
}, {
  Header: 'Groups',
  accessor: 'groupNames',
  Placeholder: 'Search by group...',
  Cell: (cellProps) => (
    <span className="groups">
      {(cellProps.value) ? cellProps.value.split(',').map((group) => (
        <Tag key={group}>
          <Icon icon="people" />
          {group}
        </Tag>
      )) : false}
    </span>
  ),
}];

const styles = {
  contactsTable: {
    '& .rt-th.rt-resizable-header': {
      paddingTop: '0.5em',
      overflow: 'hidden',
    },
    '& .groups': {
      display: 'flex',
      justifyContent: 'space-evenly',
    },
    '& .select-wrap select': {
      backgroundColor: 'rgba(16, 22, 26, 0.3)',
      color: 'white',
    },
  },


};


function Table({
  classes, list,
}) {
  return (
    <ReactTable
      data={list}
      filterable
      showPageJump={false}
      defaultFilterMethod={(filter, row) => String(row[filter.id]).toLowerCase().indexOf(filter.value.toLowerCase()) !== -1}
      columns={columns}
      className={`-striped -highlight ${classes.contactsTable}`}
    />
  );
}

Table.propTypes = {
  classes: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
};

export default injectSheet(styles)(Table);
