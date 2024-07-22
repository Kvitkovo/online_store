import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Catalog.module.scss';
import CategoryList from './components/CatalogList/CatalogList';
import SubCategoryList from './components/SubCategoryList/SubCategoryList';
import { mockCategories as categoriesData } from '../../../data/catalog';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../../../redux/slices/catalogSlice';

const Catalog = React.memo(({ setIsOpen }) => {
  const dispatch = useDispatch();
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const navigate = useNavigate();

  const handleCategoryClick = useCallback(
    (link) => {
      navigate(link);
      setIsOpen(false);
    },
    [navigate, setIsOpen],
  );
  useEffect(() => {
    document.body.classList.add(styles.disableScroll);

    return () => {
      document.body.classList.remove(styles.disableScroll);
    };
  }, []);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className={styles.categoryWrapper}>
      <div className={styles.itemsWrapper}>
        <CategoryList
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
        src={hoveredCategory?.bg || categoriesData[0].bg}
        alt={hoveredCategory?.name || categoriesData[0].name}
        className={styles.categoryBg}
      />
    </div>
  );
});

export default Catalog;
