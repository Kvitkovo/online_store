import React from 'react';
import { ICONS } from '../../ui-kit/icons';
import styles from './Catalog.module.scss';

const CatalogItem = ({ category, handleCategoryClick, setHoveredCategory }) => {
  const { sortValue, children, bg, name, link, hasSubCategory, icon } =
    category;

  return (
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
          <span className={styles.categoryItemText}>{name}</span>
          {hasSubCategory && <ICONS.ArrowRightIcon />}
        </div>
      </a>
    </li>
  );
};

export default CatalogItem;
