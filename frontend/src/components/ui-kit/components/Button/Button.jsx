import React, { memo } from 'react';
import styles from './Button.module.scss';

const Button = memo(
  ({ label, variant = 'primary', type = 'button', icon, onClick }) => {
    return (
      <button
        className={`${styles.button} ${styles[variant]}`}
        type={type}
        onClick={onClick}
      >
        <span className={styles.label}>{label}</span>
        <span className={styles.icon}> {icon} </span>{' '}
      </button>
    );
  },
);

export default Button;
