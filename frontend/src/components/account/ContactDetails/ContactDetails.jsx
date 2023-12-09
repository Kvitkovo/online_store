import React from 'react';
import styles from './ContactDetails.module.scss';
import { ICONS } from '../../ui-kit/icons';
import Button from '../../ui-kit/components/Button/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import Account from '../Account';

const ContactDetails = () => {
  const navigate = useNavigate();
  /*  const data = {
    id: '1',
    firstName: 'Олена',
    lastName: 'Шевченко',
    surname: 'Олегівна',
    phone: '+380670000000',
    email: 'example@gmail.com',
    birthday: '26.03.1992 ',
  }; */

  const navigateToEdit = () => {
    navigate('/account/change-details');
  };

  const navigateToChangePassword = () => {
    navigate('/account/change-password');
  };

  const location = useLocation();
  const userData = location.state && location.state.userData;

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
              <p>{userData.firstName}</p>
              <p>{userData.lastName}</p>
              <p>{userData.surname}n/a</p>
              <p>{userData.phone}n/a</p>
              <p>{userData.email}</p>
              <p>{userData.birthday}</p>
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
