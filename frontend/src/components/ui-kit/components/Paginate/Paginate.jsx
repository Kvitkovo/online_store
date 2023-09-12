import React, { memo } from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import styles from './Paginate.module.scss';

const Paginate = memo(({ pageCount, page, setPage }) => {
  const handleChange = (e, value) => {
    setPage(value);
  };
  return (
    <div>
      <Pagination
        className={styles['pagination']}
        count={pageCount}
        siblingCount={0}
        hidePrevButton={page <= 1}
        hideNextButton={page >= pageCount}
        page={page}
        onChange={handleChange}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            className={
              item.type === 'previous'
                ? styles['pagination-prev']
                : item.type === 'next'
                ? styles['pagination-next']
                : item.type === 'page' && item.selected
                ? styles['pagination-selected']
                : item.type === 'start-ellipsis' || item.type === 'end-ellipsis'
                ? styles['pagination-dots']
                : styles['pagination-item']
            }
          />
        )}
      />
    </div>
  );
});

export default Paginate;
