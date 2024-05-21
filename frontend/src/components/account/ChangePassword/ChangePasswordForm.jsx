import React from 'react';
import Account from '../Account';
import styles from './ChangePasswordForm.module.scss';
import PasswordDataForm from './PasswordDataForm';
import IconButton from '../../ui-kit/components/IconButton';
import { ICONS } from '../../ui-kit/icons';
import { useNavigate } from 'react-router-dom';

const ChangePasswordForm = () => {
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate('/account/personal-data');
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <Account title="Редагування особистої інформації">
          <div className={styles.formContainer}>
            <h2 className={styles.title}> Зміна паролю</h2>
            <PasswordDataForm />
          </div>
        </Account>
      </div>

      <div className={styles.mobileContainer}>
        <div className={styles.mobileHeader}>
          <div>
            <IconButton icon={<ICONS.backMobile />} onClick={navigateBack} />
          </div>
          <p className={styles.accountTitle}>Заміна паролю</p>
          <IconButton icon={<ICONS.closeMobile />} onClick={navigateBack} />
        </div>
        <PasswordDataForm />
      </div>
    </>
  );
};
export default ChangePasswordForm;
