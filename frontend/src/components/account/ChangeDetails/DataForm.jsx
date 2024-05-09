import React, { useState } from 'react';
import styles from './ChangeDetails.module.scss';
import { editUserData } from '../../../services/userData/editUserData';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import Button from '../../ui-kit/components/Button';

const DataForm = () => {
  const userData = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [correctUserData, setCorrectUserData] = useState(userData);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCorrectUserData((prevUserData) => ({
      ...prevUserData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedUserData = await editUserData(correctUserData, dispatch);
      localStorage.setItem('userfetchedData', JSON.stringify(updatedUserData));
      navigate('/account', updatedUserData);
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };
  const handleCancel = () => {
    navigate('/account');
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formContainer}>
        <div className={styles.nameData}>
          <div className={styles.dataContainer}>
            <label htmlFor="firstName">Ім’я</label>
            <input
              id="firstName"
              className={styles.dataInput}
              type="text"
              placeholder="Введіть ваше ім’я"
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
              placeholder="Введіть ваше прізвище"
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
              placeholder="Введіть ваше по батькові"
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
            <label htmlFor="email">
              Ел. пошта <span>*</span>
            </label>
            <input
              id="email"
              className={styles.dataInput}
              type="email"
              placeholder="Введіть електрону пошту"
              value={correctUserData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.dataContainer}>
            <label htmlFor="date">Дата народження</label>
            <input
              id="birthday"
              className={`${styles.dataInput} ${styles.birthday} `}
              type="date"
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
          onClick={handleSubmit}
        />
        <div className={styles.cancelBtn}>
          <Button
            variant="no-border-hovered"
            label="Скасувати"
            padding="padding-header-even"
            onClick={handleCancel}
          />
        </div>
      </div>
    </form>
  );
};

export default DataForm;
