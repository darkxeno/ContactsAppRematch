import React from 'react';
import ReactTable, { ReactTableDefaults } from 'react-table';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import FilterComponent from './Filter';
import PaginationComponent from './Pagination';

Object.assign(ReactTableDefaults, {
  FilterComponent,
  PaginationComponent,
});

const styles = {
  table: {
    '& .rt-th.rt-resizable-header': {
      paddingTop: '0.5em',
      overflow: 'hidden',
    },
    '& .rt-tr.selected.-odd, .rt-tr.selected.-even': {
      backgroundColor: '#5C7080',
    },
    '& .groups': {
      display: 'flex',
      justifyContent: 'space-evenly',
    },
    '& .select-wrap select': {
      backgroundColor: 'rgba(16, 22, 26, 0.3)',
      color: 'white',
    },
    '& .rt-tr-group': {
      flex: '0 0 auto',
    },
    '& .rt-table': {
      minHeight: 'calc( 100vh - 5.7rem )',
    },
    '& .edit-item, .delete-item': {
      textAlign: 'center',
    },
  },
};


function Table({
  classes, data, columns, getTdProps, getTrProps, getTableProps, resolveData,
}) {
  return (
    <ReactTable
      data={data}
      filterable
      resolveData={resolveData}
      getTrProps={getTrProps}
      getTdProps={getTdProps}
      getTableProps={getTableProps}
      showPageJump={false}
      defaultFilterMethod={(filter, row) => String(row[filter.id]).toLowerCase().indexOf(filter.value.toLowerCase()) !== -1}
      columns={columns}
      className={`-striped -highlight ${classes.table}`}
    />
  );
}

Table.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  getTdProps: PropTypes.func,
  getTrProps: PropTypes.func,
  getTableProps: PropTypes.func,
  resolveData: PropTypes.func,
};

Table.defaultProps = {
  getTdProps: undefined,
  getTrProps: undefined,
  getTableProps: undefined,
  resolveData: undefined,
};

export default injectSheet(styles)(Table);
