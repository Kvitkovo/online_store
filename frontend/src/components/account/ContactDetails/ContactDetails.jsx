import React from 'react';
import styles from './ContactDetails.module.scss';
import { ICONS } from '../../ui-kit/icons';
import Button from '../../ui-kit/components/Button/Button';
import { useNavigate } from 'react-router-dom';
import Account from '../Account';
import { useSelector } from 'react-redux';

const ContactDetails = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.user);

  const navigateToEdit = () => {
    navigate('/account/change-details');
  };

  const navigateToChangePassword = () => {
    navigate('/account/change-password');
  };

  return (
    <Account title={`Вітаємо, ${userData ? userData.firstName : ''}`}>
      <div className={styles.block}>
        <h2 className={styles.accountTitle}> Контактні дані</h2>
        <div className={styles.flexFieldsAndData}>
          <div className={styles.fields}>
            <p>Ім&apos;я</p>
            <p>Прізвище</p>
            <p>По батькові</p>
            <p>Номер телефону</p>
            <p>Ел. пошта</p>
            <p>Дата народження</p>
          </div>
          {userData && (
            <div className={styles.data} key={userData.id}>
              <p>{userData.firstName || 'не вказано'}</p>
              <p>{userData.lastName || 'не вказано'}</p>
              <p>{userData.surname || 'не вказано'}</p>
              <p>{userData.phone || 'не вказано'}</p>
              <p>{userData.email || 'не вказано'}</p>
              <p>{userData.birthday || 'не вказано'}</p>
            </div>
          )}
        </div>
        <div className={styles.flexButtons}>
          <Button
            variant="no-border"
            label="Редагувати"
            icon={<ICONS.PencilIcon />}
            onClick={navigateToEdit}
          />
          <Button
            variant="no-border"
            label="Змінити пароль"
            icon={<ICONS.changePassword />}
            onClick={navigateToChangePassword}
          />
        </div>
      </div>
    </Account>
  );
};
export default ContactDetails;
