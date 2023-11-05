import React, { useEffect, useState } from 'react';
import Modals from '../../Modals/Modals';
import styles from './LoginModal.module.scss';
import IconButton from '../../../ui-kit/components/IconButton';
import { ICONS } from '../../../ui-kit/icons';
import Button from '../../../ui-kit/components/Button';
import ResetPassword from '../ResetPassword';
import GoogleLogin from '../GoogleLogin';
import axios from 'axios';

const LoginModal = ({ toggleLogin, toggleRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [resetPasswordClicked, setResetPasswordClicked] = useState(false);

  const validateEmail = (value) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const disallowedPattern = /\.ru$/i;
    return emailPattern.test(value) && !disallowedPattern.test(value);
  };
  useEffect(() => {
    const login = async () => {
      if (validateEmail(email) && password) {
        try {
          const response = await axios.post(
            'https://api.imperiaholoda.com.ua:4446/v1/auth/login',
            {
              email: email,
              password: password,
            },
          );
          if (response.status === 200) {
            const token = response.data.token;
            /*  console.log('Token:', token); */
            alert('Login successful:', token);
          } else {
            alert('Login failed');
          }
        } catch (error) {
          console.error('An error occurred during login:', error);
          alert('Login failed');
        }
      }
    };
    if (submitted) {
      login();
    }
  }, [submitted, email, password]);

  const toggleReset = () => {
    setResetPassword((prev) => !prev);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return (
    <>
      <Modals type="login" onClick={toggleLogin}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <p className={styles.loginBtn}>Вхід</p>
            <p className={styles.registerBtn} onClick={toggleRegister}>
              Реєстрація
            </p>
          </div>
          <div className={styles.closeBtn}>
            <IconButton icon={<ICONS.closeMobile />} onClick={toggleLogin} />
          </div>
        </div>

        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <div className={styles.dataContainer}>
              <div className={styles.emailContainer}>
                <label className={styles.labelData} htmlFor="email">
                  Ел. пошта <span>*</span>
                </label>

                <input
                  id="email"
                  className={styles.dataInput}
                  type="email"
                  pattern="^[a-zA-Z0-9._-]+@[a-zAZ.-]+\.[a-zA-Z]{2,4}$"
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
                {resetPassword && !email && (
                  <p className={styles.errorMessage}>
                    Введіть електронну пошту
                  </p>
                )}
                {resetPassword && email && !validateEmail(email) && (
                  <p className={styles.errorMessage}>
                    Невірний формат електронної пошти
                  </p>
                )}
              </div>

              <div className={styles.passwordContainer}>
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
              </div>
            </div>

            <div className={styles.button}>
              <Button
                variant="primary"
                label="Увійти"
                padding="padding-sm"
                isFullWidth={true}
                type="submit"
                onClick={handleSubmit}
              />
            </div>
            <div>
              <p>або</p>
            </div>
            <div className={styles.googleLogin}>
              <GoogleLogin />
            </div>

            <div className={styles.resetPassword}>
              <p
                onClick={() => {
                  setResetPasswordClicked(true);
                  toggleReset();
                }}
              >
                Забули пароль?
              </p>
            </div>
            {resetPasswordClicked &&
              resetPassword &&
              email &&
              validateEmail(email) && (
                <ResetPassword toggleReset={toggleReset} userEmail={email} />
              )}
          </form>
        </div>
      </Modals>
    </>
  );
};

export default LoginModal;
