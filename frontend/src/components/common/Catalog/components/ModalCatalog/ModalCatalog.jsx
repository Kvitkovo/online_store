import React from 'react';
import styles from './ModalCatalog.module.scss';

const ModalCatalog = ({ children }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.drawer}>{children}</div>
    </div>
  );
};

export default ModalCatalog;
