import React, { useState } from 'react';
import { ICONS } from '../../ui-kit/icons';
import styles from './Catalog.module.scss';

const CatalogItem = ({ category, handleCategoryClick }) => {
  const { sortValue, children, name, hasSubCategory, link, icon } = category;

  const nameParts = name.split(' ');
  const firstPart = nameParts[0];
  const restParts = nameParts.slice(1).join(' ');

  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);

  const handleLinkClick = () => {
    if (hasSubCategory) {
      setIsSubCategoryOpen(!isSubCategoryOpen);
    } else {
      handleCategoryClick(link);
    }
  };

  const toggleSubCategory = () => {
    setIsSubCategoryOpen(!isSubCategoryOpen);
  };

  return (
    <div className={styles.contacts}>
      <li key={sortValue} className={styles.categoryItemWrapper}>
        <a className={styles.categoryLink} onClick={handleLinkClick}>
          <span className={styles.categoryIcon}>{icon}</span>
          <div className={styles.categoryItemContent}>
            {firstPart === 'Акційна' ? (
              <span className={styles.redText}>{firstPart}</span>
            ) : (
              <span className={styles.categoryItemText}>{firstPart}</span>
            )}
            <span className={styles.categoryItemText}>{restParts}</span>
          </div>
          {hasSubCategory && (
            <ICONS.ArrowRightIcon onClick={toggleSubCategory} />
          )}
        </a>

        {isSubCategoryOpen && children && children.length > 0 && (
          <ul>
            {children.map((child) => (
              <CatalogItem
                key={child.sortValue}
                category={child}
                handleCategoryClick={handleCategoryClick}
              />
            ))}
          </ul>
        )}
      </li>
    </div>
  );
};

export default CatalogItem;
