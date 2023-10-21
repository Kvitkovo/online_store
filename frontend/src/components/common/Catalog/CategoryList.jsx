import React from 'react';
import styles from './Catalog.module.scss';
import CatalogItem from './CatalogItem';

const CategoryList = ({
  categories,
  handleCategoryClick,
  setHoveredCategory,
}) => {
  return (
    <ul className={styles.categoryList}>
      {categories
        .filter((category) => !category.parent)
        .map((category) => (
          <CatalogItem
            key={category.id}
            category={category}
            handleCategoryClick={handleCategoryClick}
            setHoveredCategory={setHoveredCategory}
          />
        ))}
    </ul>
  );
};

export default CategoryList;
