import React from 'react';
import styles from './Button.module.scss';

const Button = ({
  label,
  variant = 'primary',
  type = 'button',
  icon,
  onClick,
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      type={type}
      onClick={onClick}
    >
      {label} {icon && <span className={styles.icon}> {icon} </span>}
    </button>
  );
};

export default Button;
