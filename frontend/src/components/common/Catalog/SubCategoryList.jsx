import React from 'react';
import styles from './Catalog.module.scss';

const SubCategoryList = ({ subCategories, handleCategoryClick }) => {
  return (
    <ul className={styles.subCategoryList}>
      {subCategories.map((child) => (
        <li key={child.id} className={styles.categoryItemWrapper}>
          <a
            onClick={() => handleCategoryClick(child.link)}
            className={styles.categoryLink}
          >
            {child.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SubCategoryList;
