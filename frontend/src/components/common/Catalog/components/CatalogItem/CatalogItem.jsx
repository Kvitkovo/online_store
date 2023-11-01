import React, { useState } from 'react';
import { ICONS } from '../../../../ui-kit/icons';
import styles from '../../Catalog.module.scss';
import SubCategories from '../SubCategoryList/SubCategoryList';
import ModalCatalog from '../ModalCatalog/ModalCatalog';
import { useWindowSize } from '../../../../../hooks/useWindowSize';

const CatalogItem = ({
  depthLevel,
  category,
  handleCategoryClick,
  setHoveredCategory,
  toggleMenu,
}) => {
  const { width } = useWindowSize();
  const { sortValue, children, bg, name, link, hasSubCategory, icon } =
    category;

  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
  const nameParts = name.split(' ');
  const firstPart = nameParts[0];
  const restParts = nameParts.slice(1).join(' ');

  const handleClick = () => {
    if (width <= 481) {
      isSubCategoryOpen
        ? setIsSubCategoryOpen(false)
        : children && children.length > 0
        ? setIsSubCategoryOpen(true)
        : handleCategoryClick(link);
    } else {
      handleCategoryClick(link);
    }
  };

  return (
    <>
      <li
        key={sortValue}
        className={styles.categoryItemWrapper}
        onClick={handleClick}
      >
        <a
          className={styles.categoryLink}
          onMouseOver={() =>
            setHoveredCategory
              ? setHoveredCategory({
                  subCategories: children,
                  bg: bg,
                  name: name,
                })
              : null
          }
        >
          <span className={styles.categoryIcon}>{icon}</span>
          <div className={styles.categoryItemContent}>
            {firstPart === 'Акційна' ? (
              <span className={styles.redText}>{firstPart}</span>
            ) : (
              <span className={styles.categoryItemText}>{firstPart}</span>
            )}
            <span>{restParts}</span>
          </div>
          {hasSubCategory && <ICONS.hideList className={styles.icon} />}
        </a>
      </li>
      {isSubCategoryOpen && (
        <ModalCatalog category={name} onClick={toggleMenu}>
          <SubCategories
            categories={children}
            depthLevel={depthLevel}
            handleCategoryClick={handleCategoryClick}
          />
        </ModalCatalog>
      )}
    </>
  );
};

export default CatalogItem;
