import React, { memo, useMemo } from 'react';
import styles from './Button.module.scss';

const Button = memo(
  ({
    label,
    variant = 'primary',
    padding,
    reverse,
    type = 'button',
    icon,
    isFullWidth,
    onClick,
  }) => {
    const buttonClasses = useMemo(() => {
      const classes = [styles.button, styles[variant]];
      if (padding && styles[padding]) {
        classes.push(styles[padding]);
      }
      if (isFullWidth) {
        classes.push(styles['full-width']);
      }
      return classes.join(' ');
    }, [variant, padding, isFullWidth]);
    const containerStyle = useMemo(() => {
      return {
        display: 'flex',
        flexDirection: reverse ? 'row-reverse' : 'row',
      };
    }, [reverse]);
    return (
      <button className={buttonClasses} type={type} onClick={onClick}>
        <div className={styles.btnContainer} style={containerStyle}>
          <span className={styles.label}>{label}</span>
          <span className={styles.icon}> {icon} </span>{' '}
        </div>
      </button>
    );
  },
);

export default Button;
