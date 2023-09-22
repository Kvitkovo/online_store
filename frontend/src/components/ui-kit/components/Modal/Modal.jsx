/* eslint-disable no-unused-vars */
import React, { memo, useMemo } from 'react';
import styles from './Modal.module.scss';

const Modal = memo(({ isOpen, setIsOpen, children }) => {
  // const buttonClasses = useMemo(() => {
  //   const classes = [styles.button, styles[variant]];
  //   if (padding && styles[padding]) {
  //     classes.push(styles[padding]);
  //   }
  //   return classes.join(' ');
  // }, [variant, padding]);
  // const containerStyle = useMemo(() => {
  //   return {
  //     display: 'flex',
  //     flexDirection: reverse ? 'row-reverse' : 'row',
  //   };
  // }, [reverse]);
  return isOpen ? <div>{children}</div> : null;
});

export default Modal;
