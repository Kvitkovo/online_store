/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import styles from './Path.module.scss';
import ROUTES from '../../../../constants/routers';
import { Link } from 'react-router-dom';
import { ICONS } from '../../../../components/ui-kit/icons';
import { GetCategory } from '../../../../services/catalog/categoryAccess.service';

const Path = React.memo(({ currentPageData, currentPageType }) => {
  const [parents, setParents] = useState([]);

  useEffect(() => {
    const fetchCategoryAndSubcategory = async () => {
      const categoryId = currentPageData.categoryId;
      const category = await GetCategory(categoryId);
      const parents = [];
      let parent = category;
      while (parent !== null) {
        const { id, name } = parent;
        parents.push({ id, name });
        parent = parent ? parent.parent : null;
      }
      setParents(parents.reverse());
    };
    if (currentPageType === 'product') {
      fetchCategoryAndSubcategory();
    }
    return () => {
      setParents([]);
    };
  }, [currentPageData.categoryId, currentPageType]);

  return (
    <div className={styles.pathContainer}>
      <nav className={styles.path}>
        <Link to={ROUTES.home} className={styles.navigationLink}>
          Головна
        </Link>
        {currentPageData && (
          <>
            {currentPageType === 'category' ||
              (currentPageType === 'section' && (
                <>
                  <div className={styles.arrow}>
                    <ICONS.pathArrow />
                  </div>
                  <span className={styles.navigation}>
                    {currentPageData.name}
                  </span>
                </>
              ))}
            {parents.length > 0 &&
              parents.map((parent) => {
                return (
                  <>
                    <div className={styles.arrow}>
                      <ICONS.pathArrow />
                    </div>
                    <Link
                      key={parent.id}
                      to={`/categories/1`}
                      className={styles.navigationLink}
                    >
                      {parent.name}
                    </Link>
                  </>
                );
              })}

            {currentPageType === 'product' && (
              <>
                <div className={styles.arrow}>
                  <ICONS.pathArrow />
                </div>
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
