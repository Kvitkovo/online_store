/* eslint-disable max-len */
import React, { useState } from 'react';
import { ICONS } from '../../../../ui-kit/icons';
import styles from './CatalogItem.module.scss';
import SubCategories from '../SubCategoryList/SubCategoryList';
import ModalCatalog from '../ModalCatalog/ModalCatalog';
import { useWindowSize } from '../../../../../hooks/useWindowSize';
import ParentComponent from '../ModalCatalog/ParentComponent';

const CatalogItem = ({
  depthLevel,
  category,
  handleCategoryClick,
  setHoveredCategory,
}) => {
  const { width } = useWindowSize();
  const { sortValue, children, bg, name, link, hasSubCategory, icon } =
    category;

  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
  const nameParts = name.split(' ');
  const firstPart = nameParts[0];
  const restParts = nameParts.slice(1).join(' ');

  const handleClick = () => {
    if (width <= 510) {
      isSubCategoryOpen
        ? setIsSubCategoryOpen(false)
        : children && children.length > 0
        ? setIsSubCategoryOpen(true)
        : handleCategoryClick(link);
    } else {
      handleCategoryClick(link);
    }
  };

  const handleSubCategoryToggle = () => {
    setIsSubCategoryOpen(!isSubCategoryOpen);
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
          <div className={styles.categoryTitle}>
            {icon && (
              <img
                className={styles.icon}
                src={require(`../../../../ui-kit/icons/catalog-icons/${icon}.svg`)}
                alt={icon}
              />
            )}

            <div className={styles.categoryItemContent}>
              {firstPart === 'Акційна' ? (
                <span className={styles.redText}>{firstPart}</span>
              ) : (
                <span className={styles.categoryItemText}>{firstPart}</span>
              )}
              <span>{restParts}</span>
            </div>
          </div>
          {hasSubCategory && (
            <div className={styles.iconContainer}>
              <ICONS.hideList className={styles.icon} />
            </div>
          )}
        </a>
      </li>
      {isSubCategoryOpen && (
        <ModalCatalog>
          <ParentComponent
            category={name}
            toggleMenu={handleSubCategoryToggle}
          />
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
