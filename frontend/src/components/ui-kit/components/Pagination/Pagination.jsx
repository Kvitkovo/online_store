import React, { useMemo } from 'react';

import styles from './Pagination.module.scss';
import { ICONS } from '../../icons';

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const generatePageNumbers = useMemo(() => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }, [totalPages]);

  return (
    <div className={styles.root}>
      {currentPage > 1 && (
        <div className={styles.arrow}>
          <ICONS.ArrowLeftIcon
            onClick={() => handlePageClick(currentPage - 1)}
          />
        </div>
      )}
      <span
        className={`${styles.link} ${currentPage === 1 ? styles.active : ''}`}
        onClick={() => handlePageClick(1)}
      >
        1
      </span>
      {currentPage > 4 && <span>...</span>}

      {generatePageNumbers.map((pageNumber) =>
        pageNumber !== 1 &&
        pageNumber !== totalPages &&
        Math.abs(pageNumber - currentPage) <= 2 ? (
          <span
            key={pageNumber}
            className={`${styles.link} ${
              pageNumber === currentPage ? styles.active : ''
            }`}
            onClick={() => handlePageClick(pageNumber)}
          >
            {pageNumber}
          </span>
        ) : null,
      )}

      {currentPage < totalPages - 3 && <span>...</span>}

      <span
        className={`${styles.link} ${
          currentPage === totalPages ? styles.active : ''
        }`}
        onClick={() => handlePageClick(totalPages)}
      >
        {totalPages}
      </span>

      {currentPage < totalPages && (
        <div className={styles.arrow}>
          <ICONS.ArrowRightIcon
            onClick={() => handlePageClick(currentPage + 1)}
          />
        </div>
      )}
    </div>
  );
};

export default Pagination;
