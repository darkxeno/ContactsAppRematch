import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Tag } from '@blueprintjs/core';
import posed from 'react-pose';
import Table from '../../reusable-components/Table/Table';
import { actions as ContactsActions } from '../../state/contacts';
import { actions as HistoryActions } from '../../state/history';


const Pop = posed.div({
  hoverable: true,
  init: { scale: 1 },
  hover: { scale: 1.2 },
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
  Filter: () => null,
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
}, {
  Header: 'Edit',
  sortable: false,
  resizable: false,
  filterable: false,
  width: 50,
  className: 'edit-item',
  Cell: () => (
    <Pop><Icon icon="edit" /></Pop>
  ),
}, {
  Header: 'Delete',
  sortable: false,
  resizable: false,
  filterable: false,
  width: 50,
  className: 'delete-item',
  Cell: () => (
    <Pop><Icon icon="delete" /></Pop>
  ),
}];

const wrapWithOriginal = (func, handleOriginal) => {
  func();

  if (handleOriginal) {
    handleOriginal();
  }
};

const getTdProps = (state, rowInfo, column) => {
  switch (column.Header) {
    case 'Edit':
      return {
        onClick: (e, handleOriginal) => {
          wrapWithOriginal(() => {
            HistoryActions.transitionToEditContact({ id: rowInfo.original.id });
          }, handleOriginal);
        },
      };
    case 'Delete':
      return {
        onClick: (e, handleOriginal) => {
          wrapWithOriginal(() => {
            ContactsActions.deleteContact(rowInfo.original.id);
          }, handleOriginal);
        },
      };
    default:
      return {};
  }
};

const getTrProps = (state, rowInfo) => ({
  className: (rowInfo && rowInfo.original && rowInfo.original.selected) ? 'selected' : '',
  onClick: (e, handleOriginal) => {
    wrapWithOriginal(() => {
      HistoryActions.transitionToEditContact({ id: rowInfo.original.id });
    }, handleOriginal);
  },
});


function ContactsTable({
  list, route,
}) {
  return (
    <Table
      resolveData={(data) => data.map((row) => ({ ...row, selected: route.params.id === row.id }))}
      getTrProps={getTrProps}
      getTdProps={getTdProps}
      data={list}
      filterable
      columns={columns}
    />
  );
}

ContactsTable.propTypes = {
  list: PropTypes.array.isRequired,
  route: PropTypes.object.isRequired,
};

export default ContactsTable;
