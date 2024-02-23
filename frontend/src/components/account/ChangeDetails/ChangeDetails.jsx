import React, { useEffect, useState } from 'react';
import Account from '../Account';
import styles from './ChangeDetails.module.scss';
import Button from '../../ui-kit/components/Button';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ChangeDetails = () => {
  const userData = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const [correctUserData, setCorrectUserData] = useState({
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    surname: userData.surname || '',
    email: userData.email || '',
    phone: userData.phone || '',
    birthday: userData.birthday || '',
  });

  useEffect(() => {
    setCorrectUserData({
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      surname: userData.surname || '',
      email: userData.email || '',
      phone: userData.phone || '',
      birthday: userData.birthday || '',
    });
  }, [userData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCorrectUserData((prevUserData) => ({
      ...prevUserData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /* console.log('Update user details', correctUserData); */
  };

  const handleCancel = () => {
    navigate('/account');
  };
  return (
    <Account title="Редагування особистої інформації">
      <div className={styles.mainContainer}>
        <h2 className={styles.header}> Контактні дані</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formContainer}>
            <div className={styles.nameData}>
              <div className={styles.dataContainer}>
                <label htmlFor="firstName">Ім’я</label>
                <input
                  id="firstName"
                  className={styles.dataInput}
                  type="text"
                  placeholder=""
                  value={correctUserData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.dataContainer}>
                <label htmlFor="lastName">Прізвище</label>
                <input
                  id="lastName"
                  className={styles.dataInput}
                  type="text"
                  placeholder=""
                  value={correctUserData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.dataContainer}>
                <label htmlFor="surname">По батькові</label>
                <input
                  id="surname"
                  className={styles.dataInput}
                  type="text"
                  placeholder=""
                  value={correctUserData.surname}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.contactsData}>
              <div className={styles.dataContainer}>
                <label htmlFor="phoneNumber">Номер телефону</label>

                <InputMask
                  id="phone"
                  className={styles.dataInput}
                  mask="+380 99 9999999"
                  maskChar=""
                  placeholder="+380 XX XXXXXXX"
                  value={correctUserData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.dataContainer}>
                <label htmlFor="email">Ел. пошта</label>
                <input
                  id="email"
                  className={styles.dataInput}
                  type="email"
                  placeholder=""
                  value={correctUserData.email}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.dataContainer}>
                <label htmlFor="date">Дата народження</label>
                <input
                  id="birthday"
                  className={styles.dataInput}
                  type="date"
                  placeholder=""
                  value={correctUserData.birthday}
                  onChange={handleChange}
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
              onClick={handleCancel}
            />
          </div>
        </form>
      </div>
    </Account>
  );
};

export default ChangeDetails;
