import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Catalog.module.scss';
import CategoryList from './components/CatalogList/CatalogList';
import SubCategoryList from './components/SubCategoryList/SubCategoryList';
import { mockCategories as mockData } from '../../../data/catalog/contact';
import { useWindowSize } from '../../../hooks/useWindowSize';

const Catalog = ({ setIsOpen, categories }) => {
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const formattedCategories = useMemo(() => {
    const formatCategory = (category, index) => {
      const mainPath = `/categories/${category.id}`;
      const icon = category.icon;
      const bg = mockData[index]?.bg;
      const children = categories
        .filter((child) => child.parent?.sortValue === category.sortValue)
        .map((child) => ({
          ...child,
          link: `${mainPath}/${child.id}`,
        }));

      return { ...category, children, bg, icon, link: mainPath };
    };
    return categories.map(formatCategory);
  }, [categories]);

  const handleCategoryClick = useCallback(
    (link) => {
      navigate(link);
      setIsOpen(false);
    },
    [navigate, setIsOpen],
  );

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
      {/* use srcset or source */}
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
