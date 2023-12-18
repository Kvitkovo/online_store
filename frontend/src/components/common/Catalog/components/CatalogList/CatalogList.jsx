import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../Catalog.module.scss';
import CatalogItem from '../CatalogItem/CatalogItem';

const CategoryList = ({ handleCategoryClick, setHoveredCategory }) => {
  const { menuItems } = useSelector((state) => state.menu);
  return (
    <ul className={styles.categoryList}>
      {menuItems.map((category) => {
        return (
          <CatalogItem
            key={category.id}
            category={category}
            handleCategoryClick={handleCategoryClick}
            setHoveredCategory={setHoveredCategory}
          />
        );
      })}
    </ul>
  );
};

export default CategoryList;
