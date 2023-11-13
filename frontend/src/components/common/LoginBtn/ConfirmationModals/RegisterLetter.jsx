import React from 'react';
import styles from './ConfirmationModals.module.scss';
import Modals from '../../Modals';
import IconButton from '../../../ui-kit/components/IconButton';
import { ICONS } from '../../../ui-kit/icons';

const RegisterLetter = ({ toggleModal, userEmail }) => {
  return (
    <div>
      <Modals type="confirmation">
        <div className={styles.mainContainer}>
          <div className={styles.header}>
            <p>Реєстрація</p>
            <IconButton icon={<ICONS.closeMobile />} onClick={toggleModal} />
          </div>

          <p className={styles.email}>
            {`На Вашу електронну пошту`} {}
            <span className={styles.emailExample}> {userEmail} </span>
            {}
            {`було відправлено лист
              з посиланням.`}
          </p>
          <p className={styles.textConfirmation}>
            Перейдіть за посиланням для успішного завершення реєстрації.
          </p>
        </div>
      </Modals>
    </div>
  );
};
export default RegisterLetter;
