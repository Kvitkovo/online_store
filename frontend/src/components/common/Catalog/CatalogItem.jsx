import React from 'react';
import { ICONS } from '../../ui-kit/icons';
import styles from './Catalog.module.scss';

const CatalogItem = ({ category, handleCategoryClick, setHoveredCategory }) => {
  const hasChildren = category.hasSubCategory;

  return (
    <li
      key={category.sortValue}
      className={styles.categoryItemWrapper}
      onMouseOver={() =>
        setHoveredCategory({
          subCategories: category.children,
          bg: category.bg,
          name: category.name,
        })
      }
    >
      <a
        onClick={() => handleCategoryClick(category.link)}
        className={styles.categoryLink}
      >
        <span className={styles.categoryIcon}>
          {category.icon || <ICONS.bukety_z_kvitiv />}
        </span>
        <div className={styles.categoryItemContent}>
          <span className={styles.categoryItemText}>{category.name}</span>
          {hasChildren && <ICONS.ArrowRightIcon />}
        </div>
      </a>
    </li>
  );
};

export default CatalogItem;
