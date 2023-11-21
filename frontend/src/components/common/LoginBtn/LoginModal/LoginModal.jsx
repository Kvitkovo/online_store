import React, { useState } from 'react';
import Modals from '../../Modals/Modals';
import styles from './LoginModal.module.scss';
import IconButton from '../../../ui-kit/components/IconButton';
import { ICONS } from '../../../ui-kit/icons';
import Button from '../../../ui-kit/components/Button';
import ResetPassword from '../ConfirmationModals/ResetPassword';
import GoogleLogin from '../GoogleLogin';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ toggleLogin, toggleRegister }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [resetPasswordClicked, setResetPasswordClicked] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [resetEmailError, setResetEmailError] = useState('');

  const validateEmail = (value) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const disallowedPattern = /\.ru$/i;
    return emailPattern.test(value) && !disallowedPattern.test(value);
  };

  const handleSuccessfulLogin = () => {
    navigate('/account');
    setLoginSuccess(true);
  };
  const login = async () => {
    if (validateEmail(email) && password) {
      const storedToken = localStorage.getItem('authToken');
      try {
        const response = await axios.post(
          'https://api.imperiaholoda.com.ua:4446/v1/auth/login',
          {
            email: email,
            password: password,
          },
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          },
        );
        if (response.status === 200) {
          handleSuccessfulLogin();
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setPasswordError('Невірна пошта та/або пароль!');
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setEmailError('');
    await login();
  };
  const handleGoogleLogin = async (token) => {
    await axios.post('https://api.imperiaholoda.com.ua:4446/v1/auth/google', {
      token,
    });
    localStorage.setItem('authToken', token);
    handleSuccessfulLogin();
  };

  const handleResetPassword = async () => {
    if (validateEmail(email)) {
      try {
        /* eslint-disable max-len */
        const response = await axios.post(
          `https://api.imperiaholoda.com.ua:4446/v1/users/resetPassword/${email}`,
        );

        if (response.status === 200) {
          setResetPasswordClicked(true);
          toggleReset();
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setResetEmailError('Електрона пошта не зареєстрована!');
        }
      }
    }
  };
  const toggleReset = () => {
    setResetPassword((prev) => !prev);
  };

  return (
    <>
      {!loginSuccess && (
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
                    Ел. пошта {submitted && !email && <span>*</span>}
                  </label>

                  <input
                    id="email"
                    className={styles.dataInput}
                    type="email"
                    pattern="^[a-zA-Z0-9._-]+@[a-zAZ.-]+\.[a-zA-Z]{2,4}$"
                    placeholder="Введіть електронну пошту"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value.trim());
                      setEmailError('');
                    }}
                  />
                  {submitted && emailError && (
                    <p className={styles.errorMessage}>{emailError}</p>
                  )}
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
                  {submitted && resetEmailError && (
                    <p className={styles.errorMessage}>{resetEmailError}</p>
                  )}
                </div>

                <div className={styles.passwordContainer}>
                  <label className={styles.labelData} htmlFor="password">
                    Пароль {submitted && !password && <span>*</span>}
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
                  {submitted && passwordError && (
                    <p className={styles.errorMessage}>{passwordError}</p>
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
                <GoogleLogin
                  handleGoogleLogin={(token) => {
                    handleGoogleLogin(token);
                    toggleLogin();
                  }}
                />
              </div>

              <div className={styles.resetPassword}>
                <button
                  className={styles.resetPassword}
                  onClick={handleResetPassword}
                  type="submit"
                >
                  Забули пароль?
                </button>
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
      )}
    </>
  );
};

export default LoginModal;
