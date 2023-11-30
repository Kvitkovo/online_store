import React from 'react';
import styles from './ConfirmationModals.module.scss';
import Modals from '../../Modals';
import IconButton from '../../../ui-kit/components/IconButton';
import { ICONS } from '../../../ui-kit/icons';

const RegistrationFailed = ({ onClose }) => {
  return (
    <div>
      <Modals type="confirmation">
        <div className={styles.mainContainer}>
          <div className={styles.header}>
            <p>Пошта не підтверджена.</p>
            <IconButton icon={<ICONS.closeMobile />} onClick={onClose} />
          </div>

          <p className={styles.email}>
            Сплив термін дії посилання для підтвердження пошти.
          </p>
          <p className={styles.textConfirmation}>
            Будь-ласка повторіть реєстрацію ще раз.
          </p>
        </div>
      </Modals>
    </div>
  );
};
export default RegistrationFailed;
