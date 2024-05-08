import React from 'react';
import styles from './AccountMobile.module.scss';
import { ICONS } from '../../../ui-kit/icons';

import Button from '../../../ui-kit/components/Button';
import { useNavigate } from 'react-router-dom';
import IconButton from '../../../ui-kit/components/IconButton';

const AccountMobile = () => {
  const navigate = useNavigate();
  const storedUserData = JSON.parse(localStorage.getItem('userfetchedData'));

  const navigateBack = () => {
    navigate('/account');
  };

  const navigateToEdit = () => {
    navigate('/account/change-details');
  };

  const navigateToChangePassword = () => {
    navigate('/account/change-password');
  };

  return (
    <>
      <div className={styles.mobileHeader}>
        <div>
          <IconButton icon={<ICONS.ArrowLeftIcon />} onClick={navigateBack} />
        </div>
        <p className={styles.accountTitle}>Контактні дані</p>
        <IconButton icon={<ICONS.PencilIcon />} onClick={navigateToEdit} />
      </div>
      <div className={styles.mobileUserData}>
        <div className={styles.fields}>
          <p>Ім&apos;я</p>
          {storedUserData && (
            <p className={styles.mobileUser}>
              {storedUserData.firstName || 'не вказано'}
            </p>
          )}
          <p>Прізвище</p>
          {storedUserData && (
            <p className={styles.mobileUser}>
              {storedUserData.lastName || 'не вказано'}
            </p>
          )}
          <p>По батькові</p>
          {storedUserData && (
            <p className={styles.mobileUser}>
              {storedUserData.surname || 'не вказано'}
            </p>
          )}
          <p>Номер телефону</p>
          {storedUserData && (
            <p className={styles.mobileUser}>
              {storedUserData.phone || 'не вказано'}
            </p>
          )}
          <p>Ел. пошта</p>
          {storedUserData && (
            <p className={styles.mobileUser}>
              {storedUserData.email || 'не вказано'}
            </p>
          )}
          <p>Дата народження</p>
          {storedUserData && (
            <p className={styles.mobileUser}>
              {storedUserData.birthday || 'не вказано'}
            </p>
          )}
        </div>
      </div>
      <div className={styles.changePassword}>
        <Button
          variant="no-border-hovered"
          label="Змінити пароль"
          icon={<ICONS.changePassword />}
          onClick={navigateToChangePassword}
        />
      </div>
    </>
  );
};

export default AccountMobile;
