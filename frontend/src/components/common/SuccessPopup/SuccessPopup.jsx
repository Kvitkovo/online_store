import React from 'react';
import styles from './SuccessPopup.module.scss';

const SuccessPopup = ({ children }) => {
  return (
    <div className={styles.popup}>
      <p>{children}</p>
    </div>
  );
};

export default SuccessPopup;
