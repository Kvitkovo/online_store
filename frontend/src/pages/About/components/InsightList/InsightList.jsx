import React from 'react';
import styles from './InsightList.module.scss';

const Insightlist = ({ data }) => {
  return (
    <ul className={styles.list}>
      {data.map((item) => {
        const { id, title, description } = item;
        return (
          <li className={styles.item} key={id}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Insightlist;
