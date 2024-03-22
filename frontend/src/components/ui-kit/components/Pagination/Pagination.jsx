import React from 'react';
import { usePagination, DOTS } from '../../../../hooks/usePagination';

import styles from './Pagination.module.scss';
import { ICONS } from '../../icons';

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount = 0,
    siblingCount = 0,
    currentPage = 1,
    pageSize = 12,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange((prev) => prev + 1);
  };

  const onPrevious = () => {
    onPageChange((prev) => prev - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={styles.root}>
      {currentPage > 1 && (
        <li className={styles.arrowLeft}>
          <ICONS.ArrowLeftIcon className={styles.icon} onClick={onPrevious} />
        </li>
      )}
      {paginationRange.map((pageNumber, index) => (
        <li
          className={`${styles.item}
                      ${pageNumber === DOTS && styles.dots}
                      ${pageNumber === currentPage && styles.selected}`}
          onClick={() => onPageChange(pageNumber)}
          key={index}
        >
          {pageNumber === DOTS ? '...' : pageNumber}
        </li>
      ))}
      {currentPage < lastPage && (
        <li className={styles.arrowRight}>
          <ICONS.ArrowRightIcon className={styles.icon} onClick={onNext} />
        </li>
      )}
    </ul>
  );
};

export default Pagination;
