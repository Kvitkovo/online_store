/* eslint-disable max-len */
import React, { useCallback } from 'react';
import Button from '../../../../ui-kit/components/Button';
import IconButton from '../../../../ui-kit/components/IconButton';
import { ICONS } from '../../../../ui-kit/icons';
import styles from './ConfirmationPopup.module.scss';
import Modals from '../../../../common/Modals';

const ConfirmationPopup = ({ setIsOpen, confirmedAction, action }) => {
  const handleClose = useCallback(() => setIsOpen(false), [setIsOpen]);
  const title =
    action === 'Видалити' ? 'Видалити компоненти' : 'Редагування букету';
  const mainText =
    action === 'Видалити'
      ? 'Ви дійсно бажаєте видалити всі компоненти букету?'
      : 'При редагуванні всі компоненти у конструкторі які не зібрані у букет будуть видалені!';
  return (
    <Modals type={'confirmationPopup'} onClick={handleClose}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <IconButton icon={<ICONS.CloseIcon />} onClick={handleClose} />
      </div>
      <div className={styles.body}>
        <p className={styles.question}>{mainText}</p>
        <Button variant="primary" label={action} onClick={confirmedAction} />

        <Button variant="no-border" onClick={handleClose} label={'Скасувати'} />
      </div>
    </Modals>
  );
};
export default ConfirmationPopup;
