import React, { memo } from 'react';
import styles from './Modal.module.scss';
import { Portal } from 'react-portal';

const Modal = memo(({ isOpen, setIsOpen, children, nodeId }) => {
  return isOpen ? (
    <>
      {isOpen && (
        <Portal node={document && document.getElementById(nodeId)}>
          {children}
          <div
            onClick={() => setIsOpen(false)}
            className={styles.background}
          ></div>
        </Portal>
      )}
    </>
  ) : null;
});

export default Modal;
