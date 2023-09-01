import React, { memo, useMemo } from 'react';
import styles from './Button.module.scss';

const Button = memo(
  ({ label, variant = 'primary', padding, type = 'button', icon, onClick }) => {
    const buttonClasses = useMemo(() => {
      return `${styles.button} ${styles[variant]} ${
        padding && styles[padding]
      }`;
    }, [variant, padding]);

    return (
      <button className={buttonClasses} type={type} onClick={onClick}>
        <span className={styles.label}>{label}</span>
        <span className={styles.icon}> {icon} </span>{' '}
      </button>
    );
  },
);

export default Button;
