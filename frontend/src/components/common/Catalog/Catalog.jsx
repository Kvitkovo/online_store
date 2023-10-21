import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Catalog.module.scss';
import CategoryList from './CategoryList';
import SubCategoryList from './SubCategoryList';
import { mockCategories as mockData } from '../../../data/catalog/contatct';
import ROUTES from '../../../constants/routers';

const Catalog = ({ setIsOpen, categories }) => {
  const navigate = useNavigate();
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const formatCategory = (category, index) => {
    const mainPath = `${ROUTES.contacts}/${category.alias.toLowerCase()}`;
    const icon = mockData[index]?.icon;
    const bg = mockData[index]?.bg;
    const children = categories
      .filter((child) => child.parent?.id === category.id)
      .map((child) => ({
        ...child,
        link: `${mainPath}/${child.alias.toLowerCase()}`,
      }));

    return { ...category, children, icon, bg, link: mainPath };
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
      <img
        src={hoveredCategory?.bg || mockData[0].bg}
        alt={hoveredCategory?.name || mockData[0].name}
        className={styles.categoryBg}
      />
    </div>
  );
};

export default Catalog;
