import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../Catalog.module.scss';
import CatalogItem from '../CatalogItem/CatalogItem';

const CategoryList = ({ handleCategoryClick, setHoveredCategory }) => {
  const { menuItems, prevParents, initialMenu } = useSelector(
    (state) => state.menu,
  );
  const currentCategory =
    initialMenu?.find((category) => {
      return category.id === prevParents.at(-1);
    }) || null;
  const currentCategoryName = currentCategory?.name.toLowerCase();
  return (
    <ul className={styles.categoryList}>
      {currentCategory && (
        <CatalogItem
          key={currentCategory.id}
          name={`Всі ${currentCategoryName}`}
          link={currentCategory.link}
          id={currentCategory.id}
          handleCategoryClick={handleCategoryClick}
          setHoveredCategory={setHoveredCategory}
        />
      )}
      {menuItems.map((category) => {
        return (
          <CatalogItem
            key={category.id}
            {...category}
            handleCategoryClick={handleCategoryClick}
            setHoveredCategory={setHoveredCategory}
          />
        );
      })}
      {!currentCategory && (
        <CatalogItem
          name={'Декор із квітів'}
          link={'/decor'}
          handleCategoryClick={handleCategoryClick}
          setHoveredCategory={setHoveredCategory}
        />
      )}
    </ul>
  );
};

export default CategoryList;
