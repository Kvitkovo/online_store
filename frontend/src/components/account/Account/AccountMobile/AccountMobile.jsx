import React from 'react';
import styles from './AccountMobile.module.scss';
import { ICONS } from '../../../ui-kit/icons';
import { useSelector } from 'react-redux';
import Button from '../../../ui-kit/components/Button';
import { useNavigate } from 'react-router-dom';

const AccountMobile = () => {
  const userData = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const navigateToChangePassword = () => {
    navigate('/account/change-password');
  };

  return (
    <>
      <div className={styles.mobileHeader}>
        <ICONS.ArrowLeftIcon />
        <p className={styles.accountTitle}>Контактні дані</p>
        <ICONS.PencilIcon />
      </div>
      <div className={styles.mobileUserData}>
        <div className={styles.fields}>
          <p>Ім&apos;я</p>
          {userData && (
            <p className={styles.mobileUser}>
              {userData.firstName || 'не вказано'}
            </p>
          )}
          <p>Прізвище</p>
          {userData && (
            <p className={styles.mobileUser}>
              {userData.lastName || 'не вказано'}
            </p>
          )}
          <p>По батькові</p>
          {userData && (
            <p className={styles.mobileUser}>
              {userData.surname || 'не вказано'}
            </p>
          )}
          <p>Номер телефону</p>
          {userData && (
            <p className={styles.mobileUser}>
              {userData.phone || 'не вказано'}
            </p>
          )}
          <p>Ел. пошта</p>
          {userData && (
            <p className={styles.mobileUser}>
              {userData.email || 'не вказано'}
            </p>
          )}
          <p>Дата народження</p>
          {userData && (
            <p className={styles.mobileUser}>
              {userData.birthday || 'не вказано'}
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
