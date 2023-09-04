import React, { memo, useMemo } from 'react';
import styles from './Button.module.scss';

const Button = memo(
  ({ label, variant = 'primary', padding, type = 'button', icon, onClick }) => {
    const buttonClasses = useMemo(() => {
      const classes = [styles.button, styles[variant]];
      if (padding && styles[padding]) {
        classes.push(styles[padding]);
      }
      return classes.join(' ');
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
