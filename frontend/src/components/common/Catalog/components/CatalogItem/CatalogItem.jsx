/* eslint-disable max-len */
import React from 'react';
import { ICONS } from '../../../../ui-kit/icons';
import styles from './CatalogItem.module.scss';
import { useWindowSize } from '../../../../../hooks/useWindowSize';
import { useDispatch } from 'react-redux';
import { goToSubMenu } from '../../../../../redux/slices/MenuSlice';

const CatalogItem = ({ category, handleCategoryClick, setHoveredCategory }) => {
  const { width } = useWindowSize();
  const { sortValue, children, bg, name, link, hasSubCategory, icon } =
    category;
  const dispatch = useDispatch();
  const nameParts = name.split(' ');
  const firstPart = nameParts[0];
  const restParts = nameParts.slice(1).join(' ');

  const handleClick = () => {
    if (width <= 868 && children?.length > 0) {
      dispatch(goToSubMenu({ data: children, id: category.id }));
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
    </>
  );
};

export default CatalogItem;
