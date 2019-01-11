import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import PaginationButton from './PaginationButton';


function Pagination({
  onPageChange,
  // Computed
  pages,
  // Props
  page,
  showPageSizeOptions,
  pageSizeOptions,
  pageSize,
  showPageJump,
  canPrevious,
  canNext,
  onPageSizeChange,
  className,
  pageJumpText,
  nextText,
  pageText,
  previousText,
  style,
  rowsSelectorText,
  rowsText,
  ofText,
}) {
  const [state, setState] = useState({ page });

  const getSafePage = useCallback((toPage) => {
    let finalPage = toPage;
    if (Number.isNaN(toPage)) {
      finalPage = page;
    }
    return Math.min(Math.max(finalPage, 0), pages - 1);
  });

  const changePage = useCallback((toPage) => {
    const safePage = getSafePage(toPage);
    setState({ safePage });
    if (page !== safePage) {
      onPageChange(safePage);
    }
  });

  const applyPage = useCallback((e) => {
    if (e) {
      e.preventDefault();
    }
    changePage(page === '' ? page : state.page);
  });

  return (
    <div className={`${className} -pagination`} style={style}>
      <div className="-previous">
        <PaginationButton
          onClick={() => {
            if (!canPrevious) return;
            changePage(page - 1);
          }}
          disabled={!canPrevious}
        >
          {previousText}
        </PaginationButton>
      </div>
      <div className="-center">
        <span className="-pageInfo">
          {pageText}
          {' '}
          {showPageJump ? (
            <div className="-pageJump">
              <input
                aria-label={pageJumpText}
                type={state.page === '' ? 'text' : 'number'}
                onChange={(e) => {
                  const val = e.target.value;
                  const finalPage = val - 1;
                  if (val === '') {
                    return setState({ page: val });
                  }
                  return setState({ page: getSafePage(finalPage) });
                }}
                value={state.page === '' ? '' : state.page + 1}
                onBlur={applyPage}
                onKeyPress={(e) => {
                  if (e.which === 13 || e.keyCode === 13) {
                    applyPage();
                  }
                }}
              />
            </div>
          ) : (
            <span className="-currentPage">{page + 1}</span>
          )}
          {` ${ofText} `}
          <span className="-totalPages">{pages || 1}</span>
        </span>
        {showPageSizeOptions && (
          <span className="select-wrap -pageSizeOptions">
            <select
              aria-label={rowsSelectorText}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              value={pageSize}
            >
              {pageSizeOptions.map((option, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <option key={i} value={option}>
                  {`${option} ${rowsText}`}
                </option>
              ))}
            </select>
          </span>
        )}
      </div>
      <div className="-next">
        <PaginationButton
          onClick={() => {
            if (!canNext) return;
            changePage(page + 1);
          }}
          disabled={!canNext}
        >
          {nextText}
        </PaginationButton>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  /* eslint-disable react/require-default-props */
  onPageChange: PropTypes.func,
  pages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  showPageSizeOptions: PropTypes.bool,
  pageSizeOptions: PropTypes.object,
  pageSize: PropTypes.number,
  showPageJump: PropTypes.bool,
  canPrevious: PropTypes.bool,
  canNext: PropTypes.bool,
  onPageSizeChange: PropTypes.func,
  className: PropTypes.string,
  pageJumpText: PropTypes.string,
  nextText: PropTypes.string,
  pageText: PropTypes.string,
  previousText: PropTypes.string,
  style: PropTypes.object,
  rowsSelectorText: PropTypes.string,
  rowsText: PropTypes.string,
  ofText: PropTypes.string,
};

export default Pagination;
