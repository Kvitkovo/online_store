import React from 'react';
import styles from './Wrapper.module.scss';

const Wrapper = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default Wrapper;
