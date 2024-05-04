import React from 'react';
import styles from './SmallCategories.module.scss';
import { useNavigate } from 'react-router-dom';

const SmallCategories = ({ name, icon, link, id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const currentLink = link || `/categories/${id}`;
    navigate(currentLink);
  };
  return (
    <a className={styles.categoryContainer} onClick={handleClick}>
      <h3 className={styles.categoryTitle}>{name}</h3>
      {icon ? (
        <img
          className={styles.icon}
          src={require(`../../../../ui-kit/icons/catalog-icons/${icon}.svg`)}
          alt={icon}
        />
      ) : (
        <div className={styles.iconPlaceholder}></div>
      )}
    </a>
  );
};
export default SmallCategories;
