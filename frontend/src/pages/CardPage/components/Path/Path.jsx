/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import styles from './Path.module.scss';
import ROUTES from '../../../../constants/routers';
import { Link, useParams } from 'react-router-dom';
import { ICONS } from '../../../../components/ui-kit/icons';
import { GetCategory } from '../../../../services/catalog/categoryAccess.service';

const Path = React.memo(({ currentPageData, currentPageType }) => {
  const [parents, setParents] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    if (currentPageType !== 'section') {
      const fetchCategoryAndSubcategory = async (categoryId) => {
        const category = (await GetCategory(categoryId)) || [];
        const parents = [];
        let parent = category;
        while (parent) {
          const { id, name } = parent;
          parents.unshift({ id, name });
          parent = parent ? parent.parent : null;
        }
        setParents(parents);
      };
      if (categoryId !== 'discounted') {
        fetchCategoryAndSubcategory(currentPageData?.categoryId || categoryId);
      }
    }
    return () => {
      setParents([]);
    };
  }, [categoryId, currentPageData, currentPageType]);

  return (
    <div className={styles.pathContainer}>
      <nav className={styles.path}>
        <Link to={ROUTES.home} className={styles.navigationLink}>
          Головна
        </Link>
        {currentPageData && (
          <>
            {parents.length < 1 && (
              <>
                <div className={styles.arrow}>
                  <ICONS.pathArrow />
                </div>
                <span className={styles.navigation}>
                  {currentPageData.name}
                </span>
              </>
            )}
            {parents.length >= 1 &&
              parents.map((parent) => {
                return (
                  <>
                    <div className={styles.arrow}>
                      <ICONS.pathArrow />
                    </div>
                    <Link
                      key={parent.id}
                      to={`/categories/${parent.id}`}
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
