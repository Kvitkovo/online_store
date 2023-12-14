import React from 'react';
import styles from '../../Catalog.module.scss';
import CatalogItem from '../CatalogItem/CatalogItem';

const CategoryList = React.memo(
  ({ categories, setHoveredCategory, handleCategoryClick }) => {
    return (
      <ul className={styles.categoryList}>
        {categories
          .filter((category) => !category.parent)
          .map((category) => {
            return (
              <CatalogItem
                key={category.id}
                category={category}
                depthLevel={0}
                handleCategoryClick={handleCategoryClick}
                setHoveredCategory={setHoveredCategory}
              />
            );
          })}
      </ul>
    );
  },
);

export default CategoryList;
