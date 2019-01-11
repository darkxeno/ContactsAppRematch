import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Tag } from '@blueprintjs/core';
import Table from '../../components/Table/Table';

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


function ContactsTable({
  list,
}) {
  return (
    <Table
      data={list}
      filterable
      columns={columns}
    />
  );
}

ContactsTable.propTypes = {
  list: PropTypes.array.isRequired,
};

export default ContactsTable;
