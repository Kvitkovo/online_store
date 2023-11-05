import React from 'react';
import styles from './ResetPassword.module.scss';
import Modals from '../../Modals';
import IconButton from '../../../ui-kit/components/IconButton';
import { ICONS } from '../../../ui-kit/icons';

const ResetPassword = ({ toggleReset, userEmail }) => {
  return (
    <div>
      <>
        <Modals type="resetPassword">
          <div className={styles.mainContainer}>
            <div className={styles.header}>
              <p>Відновлення паролю</p>
              <IconButton icon={<ICONS.closeMobile />} onClick={toggleReset} />
            </div>

            <p className={styles.email}>Ел. пошта</p>
            <p className={styles.emailExample}>{userEmail}</p>
            <p className={styles.textConfirmation}>
              Посилання на відновлення пароля відправлено на вказану ел. пошту.
            </p>
          </div>
        </Modals>
      </>
    </div>
  );
};
export default ResetPassword;
