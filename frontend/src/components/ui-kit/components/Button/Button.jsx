import React, { memo } from 'react';
import styles from './Button.module.scss';

const Button = memo(
  ({ label, variant = 'primary', padding, type = 'button', icon, onClick }) => {
    const buttonClasses = `${styles.button} ${styles[variant]} ${
      padding && styles[padding]
    }`;
    return (
      <button className={buttonClasses} type={type} onClick={onClick}>
        <span className={styles.label}>{label}</span>
        <span className={styles.icon}> {icon} </span>{' '}
      </button>
    );
  },
);

export default Button;
