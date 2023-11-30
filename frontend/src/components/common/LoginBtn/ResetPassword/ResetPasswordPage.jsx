import React, { useEffect, useState } from 'react';
import styles from './ResetPasswordPage.module.scss';
import { ICONS } from '../../../ui-kit/icons';
import Button from '../../../ui-kit/components/Button';
import { useModalEffect } from '../../../../hooks/useModalEffect';
import LoginModal from '../LoginModal';
import RegisterModal from '../RegisterModal';
import { useNavigate, useParams } from 'react-router-dom';
import ReactPasswordChecklist from 'react-password-checklist';
import axios from 'axios';

const ResetPasswordPage = () => {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showPasswordReq, setShowPasswordReq] = useState(true);
  const [verificationCode, setVerificationCode] = useState('');
  const { code } = useParams();

  useEffect(() => {
    setVerificationCode(code);
  }, [code]);

  const handlePasswordBlur = () => {
    setSubmitted(true);
    if (!newPassword) {
      setPasswordError('Введіть пароль');
    } else if (!validatePassword(newPassword)) {
      setPasswordError('Невірний формат паролю');
    } else {
      setPasswordError('');
    }
  };
  const validatePassword = (value) => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordPattern.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    alert.log('Data to be sent:', { verificationCode, newPassword });

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError('Паролі не співпадають');
      return;
    } else {
      setConfirmPasswordError('');

      try {
        const response = await axios.post(
          'https://api.imperiaholoda.com.ua:4446/v1/users/resetPassword',
          {
            verificationCode: verificationCode,
            newPassword: newPassword,
          },

          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (response.status === 200) {
          alert('Password reset successful');
        }
      } catch (error) {
        alert.log('Password reset failed', error);
      }
    }
  };

  const toggleLogin = () => {
    setIsOpenLogin((prev) => !prev);
    setIsOpenRegister(false);
  };
  const toggleRegister = () => {
    setIsOpenLogin(false);
    setIsOpenRegister((prev) => !prev);
  };

  const navigate = useNavigate();

  const onClose = () => {
    navigate('/');
  };

  useModalEffect(isOpenLogin, isOpenRegister);

  return (
    <div>
      <p className={styles.heading}>Забули пароль? Можна відновити :)</p>
      <div className={styles.gridTwoBlocks}>
        <div className={styles.sideMenu}>
          <div className={styles.loginBtn}>
            <Button
              variant="no-border-hovered"
              label="Увійти"
              onClick={toggleLogin}
              icon={<ICONS.halfPerson />}
              reverse="true"
            />
          </div>
          {isOpenLogin && (
            <LoginModal
              toggleLogin={toggleLogin}
              toggleRegister={toggleRegister}
            />
          )}
          {isOpenRegister && (
            <RegisterModal
              toggleLogin={toggleLogin}
              toggleRegister={toggleRegister}
            />
          )}

          <p className={styles.inactive}>Контактні дані</p>
          <p className={styles.inactive}> Мої замовлення</p>
          <p className={`${styles.inactive} ${styles.logout}`}> Вихід </p>
        </div>

        <div className={styles.rightBlock}>
          <p className={styles.header}>Відновлення паролю</p>
          <div className={styles.formContainer}>
            <form>
              <div className={styles.passwordContainer}>
                <label className={styles.labelData} htmlFor="password">
                  Введіть новий пароль
                  {submitted && !newPassword && <span>*</span>}
                </label>
                <input
                  id="password"
                  name="password"
                  className={styles.dataInput}
                  type="password"
                  placeholder="Новий пароль"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onBlur={handlePasswordBlur}
                />

                {submitted && passwordError && (
                  <ReactPasswordChecklist
                    className={styles.errorMessage}
                    rules={[
                      'minLength',
                      'number',
                      'capital',
                      'lowercase',
                      'letter',
                    ]}
                    minLength={8}
                    value={newPassword}
                    messages={{
                      letter: 'Латинські літери.',
                      minLength: 'Не менше 8 символів.',
                      number: 'Мінімум одна цифра',
                      capital: 'Мінімум одна велика літера.',
                      lowercase: 'Мінімум одна маленька літера.',
                    }}
                    onValid={() => setShowPasswordReq(false)}
                    onInvalid={() => setShowPasswordReq(true)}
                  />
                )}
                {showPasswordReq && !submitted && (
                  <p className={styles.passwordReq}>
                    Пароль має бути не менше 8 символів, складатись з цифр,
                    маленьких та великих латинських літер.
                  </p>
                )}
              </div>

              <div className={styles.passwordContainer}>
                <label className={styles.labelData} htmlFor="password">
                  Повторіть новий пароль
                  {submitted && !confirmPassword && <span>*</span>}
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  className={styles.dataInput}
                  type="password"
                  placeholder="Повторіть пароль"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {submitted && confirmPasswordError && (
                  <p className={styles.errorMessage}>{confirmPasswordError}</p>
                )}
              </div>

              <div className={styles.btnContainer}>
                <Button
                  variant="primary"
                  label="Підтвердити"
                  padding="padding-sm"
                  type="submit"
                  onClick={handleSubmit}
                />
                <Button
                  variant="no-border-hovered"
                  label="Скасувати"
                  padding="padding-header-even"
                  onClick={onClose}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResetPasswordPage;
