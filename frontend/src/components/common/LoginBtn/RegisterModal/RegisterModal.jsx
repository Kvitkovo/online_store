import React, { useState } from 'react';
import Modals from '../../Modals/Modals';
import styles from './RegisterModal.module.scss';
import IconButton from '../../../ui-kit/components/IconButton';
import { ICONS } from '../../../ui-kit/icons';
import Button from '../../../ui-kit/components/Button';
import axios from 'axios';

const RegisterModal = ({ toggleRegister, toggleLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (value) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const disallowedPattern = /\.ru$/i;
    return emailPattern.test(value) && !disallowedPattern.test(value);
  };

  const validatePassword = (value) => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordPattern.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (validateEmail(email) && validatePassword(password) && name) {
      try {
        const response = await axios.post(
          'https://api.imperiaholoda.com.ua:4446/v1/auth/register',
          {
            name: name,
            email: email,
            password: password,
          },
        );
        if (response.status === 200) {
          alert('Registration successful');
        } else {
          alert('Registration failed');
        }
      } catch (error) {
        if (error.response) {
          console.error(
            'An error occurred during registration. Status:',
            error.response.status,
          );
          console.error('Response data:', error.response.data);
        } else {
          console.error(
            'An error occurred during registration:',
            error.message,
          );
        }
        alert('Registration failed');
      }
    }
  };
  return (
    <>
      <Modals type="login" onClick={toggleRegister}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <p className={styles.loginBtn} onClick={toggleLogin}>
              Вхід
            </p>
            <p className={styles.registerBtn}>Реєстрація</p>
          </div>
          <div className={styles.closeBtn}>
            <IconButton icon={<ICONS.closeMobile />} onClick={toggleRegister} />
          </div>
        </div>

        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <div className={styles.dataContainer}>
              <div className={styles.nameContainer}>
                <label className={styles.labelData} htmlFor="name">
                  Ім’я <span>*</span>
                </label>

                <input
                  id="name"
                  className={styles.dataInput}
                  type="text"
                  placeholder="Введіть ваше ім’я"
                  onChange={(e) => setName(e.target.value.trim())}
                />
                {submitted && !name && (
                  <p className={styles.errorMessage}>Введіть ваше ім`я</p>
                )}
              </div>
              <div className={styles.emailContainer}>
                <label className={styles.labelData} htmlFor="email">
                  Ел. пошта <span>*</span>
                </label>

                <input
                  id="email"
                  className={styles.dataInput}
                  type="email"
                  placeholder="Введіть електронну пошту"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                />
                {submitted && !email && (
                  <p className={styles.errorMessage}>
                    Введіть електронну пошту
                  </p>
                )}
                {submitted && email && !validateEmail(email) && (
                  <p className={styles.errorMessage}>
                    Невірний формат електронної пошти
                  </p>
                )}
              </div>

              <div className={styles.paswordContainer}>
                <label className={styles.labelData} htmlFor="password">
                  Пароль <span>*</span>
                </label>

                <input
                  id="password"
                  name="password"
                  className={styles.dataInput}
                  type="password"
                  placeholder="Введіть ваш пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {submitted && !password && (
                  <p className={styles.errorMessage}>Введіть пароль</p>
                )}
                {submitted && password && !validatePassword(password) && (
                  <p className={styles.errorMessage}>
                    Пароль має бути не менше 8 символів, містити латинські
                    літери, мінімум одну велику літеру, та мінімум одну цифру
                  </p>
                )}
              </div>
            </div>

            <div className={styles.button}>
              <Button
                variant="primary"
                label="Зареєструватися"
                padding="padding-sm"
                isFullWidth={true}
                type="submit"
                onClick={handleSubmit}
              />
            </div>
          </form>
        </div>
      </Modals>
    </>
  );
};
export default RegisterModal;
