import React, { useCallback, useState } from 'react';
import Modals from '../../common/Modals/Modals';
import styles from './LoginModal.module.scss';
import IconButton from '../../ui-kit/components/IconButton';
import { ICONS } from '../../ui-kit/icons';
import Button from '../../ui-kit/components/Button';
import GoogleLogin from '../GoogleLogin';
import {
  googleLoginRequest,
  loginUser,
  resetPasswordRequest,
} from '../../../services/login/login.service';
import ResetPasswordModal from '../ConfirmationModals/ResetPasswordModal';
import { useDispatch } from 'react-redux';
/* eslint-disable max-len */
import { handleUserData } from '../../../services/userData/handleUserData.service';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ toggleLogin, toggleRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [resetPasswordClicked, setResetPasswordClicked] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = (value) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const disallowedPattern = /\.ru$/i;
    return emailPattern.test(value) && !disallowedPattern.test(value);
  };

  const isResetPasswordValid =
    resetPasswordClicked && resetPassword && email && validateEmail(email);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setEmailError('');
    setPasswordError('');

    if (!email || !validateEmail(email)) {
      setEmailError(
        !email
          ? 'Введіть електронну пошту'
          : 'Невірний формат електронної пошти',
      );
      return;
    }

    if (!password) {
      setPasswordError('Введіть пароль');
      return;
    }

    const loginResult = await loginUser({ email, password });
    if (loginResult && loginResult.success) {
      handleUserData(loginResult.token, loginResult.id, navigate, dispatch);
      toggleLogin();
    } else if (loginResult && loginResult.error) {
      setPasswordError(loginResult.error);
    }
  };
  const handleGoogleLogin = useCallback(
    async (token, id) => {
      const loginSuccess = await googleLoginRequest(token, id);
      if (loginSuccess) {
        handleUserData(loginSuccess.token, loginSuccess.id, navigate, dispatch);
      }
    },
    [navigate, dispatch],
  );
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setEmailError('');
    if (validateEmail(email)) {
      const resetResult = await resetPasswordRequest(email);
      if (resetResult && resetResult.success) {
        setResetPasswordClicked(true);
        toggleReset();
      } else if (resetResult && resetResult.error) {
        setEmailError(resetResult.error);
      }
    }
  };
  const toggleReset = () => {
    setResetPassword((prev) => !prev);
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
                handleGoogleLogin={useCallback(
                  (token) => {
                    handleGoogleLogin(token);
                    toggleLogin();
                  },
                  [handleGoogleLogin, toggleLogin],
                )}
              />
            </div>
          </form>
          <div className={styles.resetPassword}>
            <button
              className={styles.resetPassword}
              onClick={handleResetPassword}
              type="button"
            >
              Забули пароль?
            </button>
          </div>
          {isResetPasswordValid && (
            <ResetPasswordModal toggleReset={toggleReset} userEmail={email} />
          )}
        </div>
      </Modals>
    </>
  );
};

export default LoginModal;
