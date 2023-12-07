import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Catalog.module.scss';
import CategoryList from './components/CatalogList/CatalogList';
import SubCategoryList from './components/SubCategoryList/SubCategoryList';
import { mockCategories as mockData } from '../../../data/catalog/contact';
import ROUTES from '../../../constants/routers';
import { useWindowSize } from '../../../hooks/useWindowSize';

const Catalog = ({ setIsOpen, categories }) => {
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const formatCategory = (category, index) => {
    const mainPath = `${ROUTES.category}/${category.alias.toLowerCase()}`;
    const icon = category.icon;
    const bg = mockData[index]?.bg;
    const children = categories
      .filter((child) => child.parent?.sortValue === category.sortValue)
      .map((child) => ({
        ...child,
        link: `${mainPath}/${child.alias.toLowerCase()}`,
      }));

    return { ...category, children, bg, icon, link: mainPath };
  };

  const formattedCategories = categories
    .filter((category) => !category.parent)
    .map(formatCategory);

  const handleCategoryClick = (link) => {
    navigate(link);
    setIsOpen(false);
  };

  return (
    <div className={styles.categoryWrapper}>
      <div className={styles.itemsWrapper}>
        <CategoryList
          categories={formattedCategories}
          handleCategoryClick={handleCategoryClick}
          setHoveredCategory={setHoveredCategory}
        />
        {hoveredCategory && (
          <SubCategoryList
            subCategories={hoveredCategory.subCategories}
            handleCategoryClick={handleCategoryClick}
          />
        )}
      </div>
      {width > 510 ? (
        <img
          src={hoveredCategory?.bg || mockData[0].bg}
          alt={hoveredCategory?.name || mockData[0].name}
          className={styles.categoryBg}
        />
      ) : null}
    </div>
  );
};

export default Catalog;
