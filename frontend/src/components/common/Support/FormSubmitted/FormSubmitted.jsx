import React, { useEffect } from 'react';
import styles from './FormSubmitted.module.scss';
import Modals from '../../Modals';
import IconButton from '../../../ui-kit/components/IconButton';
import { ICONS } from '../../../ui-kit/icons';

const FormSubmitted = ({ toggleSubmittedMessage }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      toggleSubmittedMessage();
    }, 5000);

    return () => clearTimeout(timer);
  }, [toggleSubmittedMessage]);
  return (
    <Modals type="formSubmitted" onClick={toggleSubmittedMessage}>
      <div className={styles.header}>
        <div className={styles.headerContent}> Підтримка</div>
        <div className={styles.iconContainer}>
          <IconButton
            onClick={toggleSubmittedMessage}
            icon={<ICONS.closeMobile />}
          />
        </div>
      </div>
      <div className={styles.mainContainer}>
        <h2>Ваш запит відправлено.</h2>
        <h3>Ми зв’яжемося з вами найближчим часом.</h3>
        <h2>Дякуємо за звернення!</h2>
      </div>
    </Modals>
  );
};

export default FormSubmitted;
