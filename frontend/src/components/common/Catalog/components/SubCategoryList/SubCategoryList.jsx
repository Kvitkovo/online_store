import React from 'react';
import CatalogItem from '../CatalogItem/CatalogItem';
import { useWindowSize } from '../../../../../hooks/useWindowSize';

const SubCategories = ({
  depthLevel,
  categories,
  subCategories,
  handleCategoryClick,
}) => {
  const { width } = useWindowSize();

  return (
    <ul style={{ padding: width > 481 ? 22 : 0 }}>
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
