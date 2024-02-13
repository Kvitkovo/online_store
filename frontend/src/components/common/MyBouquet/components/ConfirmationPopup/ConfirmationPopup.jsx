import React, { useCallback } from 'react';
import Button from '../../../../ui-kit/components/Button';
import IconButton from '../../../../ui-kit/components/IconButton';
import { ICONS } from '../../../../ui-kit/icons';
import styles from './ConfirmationPopup.module.scss';
import Modals from '../../../../common/Modals';

const ConfirmationPopup = ({ setIsOpen, deleteAll }) => {
  const handleClose = useCallback(() => setIsOpen(false), [setIsOpen]);
  return (
    <Modals type={'confirmationPopup'} onClick={handleClose}>
      <div className={styles.header}>
        <h1 className={styles.title}>Видалити компоненти</h1>
        <IconButton icon={<ICONS.CloseIcon />} onClick={handleClose} />
      </div>
      <div className={styles.body}>
        <p className={styles.question}>
          Ви дійсно бажаєте видалити всі компоненти букету?
        </p>
        <Button variant="primary" label={'Видалити'} onClick={deleteAll} />

        <Button variant="no-border" onClick={handleClose} label={'Скасувати'} />
      </div>
    </Modals>
  );
};
export default ConfirmationPopup;
