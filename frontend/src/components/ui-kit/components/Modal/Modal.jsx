import React, { memo } from 'react';
import styles from './Modal.module.scss';
import { Portal } from 'react-portal';

const Modal = memo(({ isOpen, setIsOpen, children, nodeId }) => {
  const handleOutsideClick = () => setIsOpen(false);

  return isOpen ? (
    <>
      {isOpen && (
        <Portal node={document && document.getElementById(nodeId)}>
          {children}
          <div onClick={handleOutsideClick} className={styles.background}></div>
        </Portal>
      )}
    </>
  ) : null;
});

export default Modal;
