import React, { useState, useCallback } from 'react';
import ReactTable, { ReactTableDefaults } from 'react-table';
import selectTableHOC from 'react-table/lib/hoc/selectTable';
import _find from 'lodash/find';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import FilterComponent from './Filter';
import PaginationComponent from './Pagination';
import SelectInputComponent from './SelectInput';


Object.assign(ReactTableDefaults, {
  FilterComponent,
  PaginationComponent,
});

const SelectTable = selectTableHOC(ReactTable);

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

const wrapWithOriginal = (func, handleOriginal) => {
  func();

  if (handleOriginal) {
    handleOriginal();
  }
};

const getAugmentedTxProps = (getTxProps, toggleSelection) => (state, rowInfo, column, instance) => {
  if (column.id === '_selector') {
    return {
      className: 'selector',
      onClick: (e, handleOriginal) => {
        wrapWithOriginal(() => {
          toggleSelection((rowInfo) ? rowInfo.original.id : undefined);
        }, handleOriginal);
      },
    };
  }
  if (getTxProps) {
    return getTxProps(state, rowInfo, column, instance);
  }
  return {};
};

function Table({
  classes, data, columns, getTdProps, getTrProps, getTableProps, resolveData,
}) {
  const [state, setState] = useState({ selected: {} });

  const oneNotSelected = Object.keys(state.selected).length > 0 ? _find(state.selected, (e) => !e) === false : true;

  const toggleSelection = useCallback((i) => {
    setState({ ...state, selected: { ...state.selected, [i]: !state.selected[i] } });
  });

  const toggleAll = useCallback(() => {
    setState({
      ...state,
      selected: data.reduce((acc, v) => {
        // eslint-disable-next-line no-param-reassign
        acc[v.id] = oneNotSelected;
        return acc;
      }, state.selected),
    });
  });

  return (
    <SelectTable
      data={data}
      filterable
      resolveData={resolveData}
      keyField="id"
      selectAll={!oneNotSelected}
      toggleSelection={toggleSelection}
      isSelected={(i) => state.selected[i]}
      SelectInputComponent={SelectInputComponent}
      SelectAllInputComponent={SelectInputComponent}
      toggleAll={toggleAll}
      selectType="checkbox"
      getTheadThProps={getAugmentedTxProps(null, toggleAll)}
      getTrProps={getTrProps}
      getTdProps={getAugmentedTxProps(getTdProps, toggleSelection)}
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
