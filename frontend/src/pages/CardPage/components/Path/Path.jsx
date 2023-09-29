import React from 'react';
import styles from './Path.module.scss';

const Path = () => {
  return (
    <div className={styles.pathContainer}>
      <p className={styles.path}>
        Головна <span> &gt; </span> Букети з квітів <span> &gt;</span> Букет
        “101” троянда
      </p>
    </div>
  );
};
export default Path;
