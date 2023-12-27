import React from 'react';
import CatalogItem from '../CatalogItem/CatalogItem';
import { useWindowSize } from '../../../../../hooks/useWindowSize';
import styles from '../../Catalog.module.scss';

const SubCategories = ({ subCategories, handleCategoryClick }) => {
  const { width } = useWindowSize();

  return (
    <>
      {width > 868 && subCategories?.length > 0 && (
        <ul className={styles.categoryList}>
          {subCategories.map((child) => (
            <CatalogItem
              key={child.id}
              {...child}
              handleCategoryClick={handleCategoryClick}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default SubCategories;
