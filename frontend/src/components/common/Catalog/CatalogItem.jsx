import React from 'react';
import { ICONS } from '../../ui-kit/icons';
import styles from './Catalog.module.scss';
import { useWindowSize } from '../../../hooks/useWindowSize';
import ModalCategory from './ModalCategory';

const CatalogItem = ({ category, handleCategoryClick, setHoveredCategory }) => {
  const { width } = useWindowSize();
  const { sortValue, children, bg, name, link, hasSubCategory, icon } =
    category;

  //Розділяємо ім'я на частини використовуючи розділювач
  const nameParts = name.split(' ');
  const firstPart = nameParts[0]; //Перша частина імені (Акційна)
  const restParts = nameParts.slice(1).join(' '); // Інша частина

  return (
    <>
      {width < 481 ? (
        <ModalCategory
          category={category}
          handleCategoryClick={handleCategoryClick}
        />
      ) : (
        <li
          key={sortValue}
          className={styles.categoryItemWrapper}
          onMouseOver={() =>
            setHoveredCategory({
              subCategories: children,
              bg: bg,
              name: name,
            })
          }
        >
          <a
            onClick={() => handleCategoryClick(link)}
            className={styles.categoryLink}
          >
            <span className={styles.categoryIcon}>
              {icon || <ICONS.bukety_z_kvitiv />}
            </span>
            <div className={styles.categoryItemContent}>
              {firstPart === 'Акційна' ? (
                <span className={styles.redText}>{firstPart}</span>
              ) : (
                <span className={styles.categoryItemText}>{firstPart}</span>
              )}
              <span className={styles.categoryItemText}>{restParts}</span>
            </div>
            {hasSubCategory && <ICONS.ArrowRightIcon />}
          </a>
        </li>
      )}
    </>
  );
};

export default CatalogItem;
