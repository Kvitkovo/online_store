import React from 'react';
import Account from '../Account';
import styles from './ChangeDetails.module.scss';
import Button from '../../ui-kit/components/Button';

const ChangeDetails = () => {
  return (
    <Account title="Редагування особистої інформації">
      <div className={styles.mainContainer}>
        <h2 className={styles.header}> Контактні дані</h2>
        <form action="">
          <div className={styles.formContainer}>
            <div className={styles.nameData}>
              <div className={styles.dataContainer}>
                <label htmlFor="firstName">Ім’я</label>
                <input
                  id="firstName"
                  className={styles.dataInput}
                  type="text"
                  placeholder=""
                />
              </div>
              <div className={styles.dataContainer}>
                <label htmlFor="lastName">Прізвище</label>
                <input
                  id="lastName"
                  className={styles.dataInput}
                  type="text"
                  placeholder=""
                />
              </div>
              <div className={styles.dataContainer}>
                <label htmlFor="patronimic">По батькові</label>
                <input
                  id="patronimic"
                  className={styles.dataInput}
                  type="text"
                  placeholder=""
                />
              </div>
            </div>
            <div className={styles.contactsData}>
              <div className={styles.dataContainer}>
                <label htmlFor="phoneNumber">Номер телефону</label>
                <input
                  id="phoneNumber"
                  className={styles.dataInput}
                  type="phone"
                  placeholder=""
                />
              </div>
              <div className={styles.dataContainer}>
                <label htmlFor="email">Ел. пошта</label>
                <input
                  id="email"
                  className={styles.dataInput}
                  type="email"
                  placeholder=""
                />
              </div>
              <div className={styles.dataContainer}>
                <label htmlFor="date">Дата народження</label>
                <input
                  id="date"
                  className={styles.dataInput}
                  type="date"
                  placeholder=""
                />
              </div>
            </div>
          </div>
          <div className={styles.btnContainer}>
            <Button
              variant="primary"
              label="Зберегти"
              padding="padding-sm"
              type="submit"
            />
            <Button
              variant="no-border-hovered"
              label="Скасувати"
              padding="padding-header-even"
            />
          </div>
        </form>
      </div>
    </Account>
  );
};

export default ChangeDetails;
