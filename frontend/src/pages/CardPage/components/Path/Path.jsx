/* eslint-disable max-len */
import React from 'react';
import styles from './Path.module.scss';
import ROUTES from '../../../../constants/routers';
import { Link } from 'react-router-dom';
import { ICONS } from '../../../../components/ui-kit/icons';

const Path = React.memo(({ currentPageData, currentPageType }) => {
  return (
    <div className={styles.pathContainer}>
      <nav className={styles.path}>
        <Link to={ROUTES.home} className={styles.navigationLink}>
          Головна
        </Link>
        {currentPageData && (
          <>
            <ICONS.pathArrow />
            {currentPageType === 'category' || currentPageType === 'section' ? (
              <span className={styles.navigation}>{currentPageData.name}</span>
            ) : (
              <Link
                to={`/categories/${currentPageData.categoryId}`}
                className={styles.navigationLink}
              >
                {' '}
                {currentPageData.categoryName}
              </Link>
            )}
            {currentPageType === 'product' && (
              <>
                <ICONS.pathArrow />
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
