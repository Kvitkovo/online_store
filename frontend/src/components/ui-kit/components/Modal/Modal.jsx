import React, { memo } from 'react';
import styles from './Modal.module.scss';
import { Portal } from 'react-portal';

const Modal = memo(({ isOpen, setIsOpen, children }) => {
  return isOpen ? (
    <>
      {isOpen && <Portal>{children}</Portal>}
      <div onClick={() => setIsOpen(false)} className={styles.background}></div>
    </>
  ) : null;
});

export default Modal;
