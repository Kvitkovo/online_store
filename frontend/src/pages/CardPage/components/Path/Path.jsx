/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import styles from './Path.module.scss';
import ROUTES from '../../../../constants/routers';

import { Link, useParams } from 'react-router-dom';
import { GetCategory } from '../../../../services/catalog/categoryAccess.service';
import { ICONS } from '../../../../components/ui-kit/icons';

const Path = React.memo(({ currentPageData = {} }) => {
  const params = useParams();
  const currentPageType = params.categoryId ? 'category' : 'product';
  const [currentPage, setCurrentPage] = useState(null);
  const findCurrentPage = useCallback(async () => {
    if (currentPageType === 'category') {
      const result = await GetCategory(params.categoryId);
      setCurrentPage(result);
    } else {
      setCurrentPage(currentPageData);
    }
  }, [currentPageData, currentPageType, params.categoryId]);

  useEffect(() => {
    findCurrentPage();
  });

  return (
    <div className={styles.pathContainer}>
      <nav className={styles.path}>
        <Link to={ROUTES.home} className={styles.navigationLink}>
          Головна
        </Link>
        {currentPage && (
          <>
            <ICONS.arrowRight />
            {currentPageType === 'category' ? (
              <span className={styles.navigation}>{currentPage.name}</span>
            ) : (
              <Link
                to={`/categories/${
                  currentPageType === 'category'
                    ? params.categoryId
                    : currentPage.categoryId
                }`}
                className={styles.navigationLink}
              >
                {' '}
                {currentPage.categoryName}
              </Link>
            )}
            {currentPageType === 'product' && (
              <>
                <ICONS.arrowRight />
                <span className={styles.navigation}>{currentPage.title}</span>
              </>
            )}
          </>
        )}
      </nav>
    </div>
  );
});
export default Path;
