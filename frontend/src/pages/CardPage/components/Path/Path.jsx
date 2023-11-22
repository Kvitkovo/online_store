/* eslint-disable max-len */
import React from 'react';
import styles from './Path.module.scss';
import ROUTES from '../../../../constants/routers';

import { Link, useParams } from 'react-router-dom';
import { ICONS } from '../../../../components/ui-kit/icons';

const Path = React.memo(({ currentPageData, currentPageType }) => {
  const params = useParams();

  return (
    <div className={styles.pathContainer}>
      <nav className={styles.path}>
        <Link to={ROUTES.home} className={styles.navigationLink}>
          Головна
        </Link>
        {currentPageData && (
          <>
            <ICONS.arrowRight />
            {currentPageType === 'category' ? (
              <span className={styles.navigation}>{currentPageData.name}</span>
            ) : (
              <Link
                to={`/categories/${
                  currentPageType === 'category'
                    ? params.categoryId
                    : currentPageData.categoryId
                }`}
                className={styles.navigationLink}
              >
                {' '}
                {currentPageData.categoryName}
              </Link>
            )}
            {currentPageType === 'product' && (
              <>
                <ICONS.arrowRight />
                <span className={styles.navigation}>
                  {currentPageData.title}
                </span>
              </>
            )}
          </>
        )}
      </nav>
    </div>
  );
});
export default Path;
