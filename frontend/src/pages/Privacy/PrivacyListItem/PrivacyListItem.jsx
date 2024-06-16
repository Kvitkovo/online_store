import React from 'react';
import styles from './PrivacyListItem.module.scss';

const PrivacyListItem = ({ index, title, description, subList }) => {
  return (
    <li>
      <h2 className={styles.itemTitle}>
        <span className={styles.itemTitle_number}>{index + 1}. </span> {title}
      </h2>
      <p className={styles.description}>{description}</p>
      {subList && (
        <ul className={styles.subList}>
          {subList.map((subItem, idx) => (
            <li key={idx} className={styles.subList__item}>
              <p>{subItem}</p>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default PrivacyListItem;
