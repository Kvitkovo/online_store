import React from 'react';
import styles from './ContactDetails.module.scss';
import { ICONS } from '../../ui-kit/icons';
import Button from '../../ui-kit/components/Button/Button';
import { useNavigate } from 'react-router-dom';
import Account from '../Account';

const ContactDetails = () => {
  const navigate = useNavigate();
  const storedUserData = JSON.parse(localStorage.getItem('userfetchedData'));

  const navigateToEdit = () => {
    navigate('/account/change-details');
  };

  const navigateToChangePassword = () => {
    navigate('/account/change-password');
  };

  return (
    <Account
      title={`Вітаємо, ${storedUserData ? storedUserData.firstName : ''}`}
    >
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
          {storedUserData && (
            <div className={styles.data} key={storedUserData.id}>
              <p>{storedUserData.firstName || 'не вказано'}</p>
              <p>{storedUserData.lastName || 'не вказано'}</p>
              <p>{storedUserData.surname || 'не вказано'}</p>
              <p>{storedUserData.phone || 'не вказано'}</p>
              <p>{storedUserData.email || 'не вказано'}</p>
              <p>{storedUserData.birthday || 'не вказано'}</p>
            </div>
          )}
        </div>
        <div className={styles.flexButtons}>
          <Button
            variant="no-border-hovered"
            label="Редагувати"
            icon={<ICONS.PencilIcon />}
            onClick={navigateToEdit}
          />
          <Button
            variant="no-border-hovered"
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
