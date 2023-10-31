import React from 'react';
import CatalogItem from '../CatalogItem/CatalogItem';
import { useWindowSize } from '../../../../../hooks/useWindowSize';
import styles from '../../Catalog.module.scss';

const SubCategories = ({
  depthLevel,
  categories,
  subCategories,
  handleCategoryClick,
}) => {
  const { width } = useWindowSize();

  return (
    <ul className={styles.categoryList}>
      {width > 481
        ? subCategories?.length > 0 &&
          subCategories.map((child) => (
            <CatalogItem
              key={child.sortValue}
              category={child}
              handleCategoryClick={handleCategoryClick}
            />
          ))
        : categories?.length > 0 &&
          categories.map((category) => (
            <CatalogItem
              key={category.sortValue}
              category={category}
              depthLevel={depthLevel + 1}
              handleCategoryClick={handleCategoryClick}
            />
          ))}
    </ul>
  );
};

export default SubCategories;
