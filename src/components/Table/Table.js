import React from 'react';
import ReactTable, { ReactTableDefaults } from 'react-table';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import FilterComponent from './Filter';
import PaginationButton from './PaginationButton';
import PaginationComponent from './Pagination';

Object.assign(ReactTableDefaults, {
  FilterComponent,
  PaginationComponent,
  //PreviousComponent: PaginationButton,
  //NextComponent: PaginationButton,
});

const styles = {
  table: {
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
  classes, data, columns,
}) {
  return (
    <ReactTable
      data={data}
      filterable
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
};

export default injectSheet(styles)(Table);
