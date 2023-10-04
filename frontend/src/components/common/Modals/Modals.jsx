import React, { memo } from 'react';
import styles from './Modals.module.scss';

const Modals = memo(({ type, children, onClick }) => {
  const handleButtonClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div className={styles.overlay} onClick={onClick}>
      <div
        className={`${styles.drawer} ${styles[type]}`}
        onClick={handleButtonClick}
      >
        {children}
      </div>
    </div>
  );
});

export default Modals;
