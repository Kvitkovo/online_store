import React from 'react';
import styles from './ContactDetails.module.scss';
import { ICONS } from '../../ui-kit/icons';
import Button from '../../ui-kit/components/Button/Button';

const ContactDetails = () => {
  return (
    <div className={styles.contactDetails}>
      <h2> Контактні дані</h2>
      <div className={styles.flexFieldsAndData}>
        <div className={styles.fields}>
          <p>Ім&apos;я</p>
          <p>Прізвище</p>
          <p>По батькові</p>
          <p>Номер телефону</p>
          <p>Ел. пошта</p>
          <p>Дата народження</p>
        </div>
        <div className={styles.data}>
          <p>Олена</p>
          <p>Шевченко</p>
          <p>Олегівна</p>
          <p>+380670000000</p>
          <p>example@gmail.com</p>
          <p>26.03.1992</p>
        </div>
      </div>
      <div className={styles.flexButtons}>
        <Button
          variant="no-border"
          label="Редагувати"
          icon={<ICONS.PencilIcon />}
        />
        <Button
          variant="no-border"
          label="Змінити пароль"
          icon={<ICONS.changePassword />}
        />
      </div>
    </div>
  );
};
export default ContactDetails;
