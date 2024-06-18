import React, { useRef, useState } from 'react';
import styles from './ChangePasswordForm.module.scss';
import Button from '../../ui-kit/components/Button';
import { useNavigate } from 'react-router-dom';
/* eslint-disable max-len */
import { changePassword } from '../../../services/userData/changePassword.service';
import ReactPasswordChecklist from 'react-password-checklist';

const ChangePasswordForm = () => {
  const oldPasswordRef = useRef(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showPasswordReq, setShowPasswordReq] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const NavigateAccount = () => {
    navigate('/account');
  };

  const validatePassword = (value) => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\s]).{8,}$/;
    return passwordPattern.test(value);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const oldPassword = oldPasswordRef.current.value;

    if (!oldPassword) {
      setOldPasswordError('Введіть пароль');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setConfirmPasswordError('Паролі не співпадають');
      return;
    } else {
      setConfirmPasswordError('');
    }
    if (validatePassword(newPassword)) {
      const response = await changePassword({
        email: localStorage.getItem('email'),
        oldPassword,
        newPassword,
      });
      if (response.success) {
        navigate('/account');
      } else if (response.error === 'Невірний пароль!') {
        setOldPasswordError(response.error);
      }
    }
  };

  return (
    <div>
      <div className={styles.formContainer}>
        <h2 className={styles.title}> Зміна паролю</h2>
        <form onSubmit={handlePasswordChange}>
          <div className={styles.passwordContainer}>
            <label htmlFor="password">Введіть старий пароль</label>
            <input
              className={styles.dataInput}
              id="oldPassword"
              name="oldPassword"
              type="password"
              placeholder="Введіть ваш пароль"
              ref={oldPasswordRef}
            />
            {submitted && oldPasswordError && (
              <p className={styles.errorMessage}>{oldPasswordError}</p>
            )}
          </div>

          <div className={styles.passwordContainer}>
            <label htmlFor="password">Введіть новий пароль</label>
            <input
              className={styles.dataInput}
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="Введіть новий пароль"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setShowPasswordReq(true);
              }}
            />

            {submitted && !validatePassword(newPassword) && (
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
                onValid={() => {
                  setShowPasswordReq(false);
                }}
                onInvalid={() => setShowPasswordReq(true)}
              />
            )}
            {!submitted && showPasswordReq && (
              <p className={styles.passwordReq}>
                Пароль має бути не менше 8 символів, складатись з цифр,
                маленьких та великих латинських літер.
              </p>
            )}
          </div>

          <div className={styles.passwordContainer}>
            <label htmlFor="password">Повторіть новий пароль</label>
            <input
              className={styles.dataInput}
              id="confirmNewPassword"
              name="confirmNewPassword"
              type="password"
              placeholder="Повторіть пароль"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            {submitted && confirmNewPassword && (
              <p className={styles.errorMessage}>{confirmPasswordError}</p>
            )}
          </div>

          <div className={styles.btnContainer}>
            <Button
              variant="primary"
              label="Підтвердити"
              padding="padding-sm"
              type="submit"
              onClick={handlePasswordChange}
            />
            <Button
              variant="no-border-hovered"
              label="Скасувати"
              padding="padding-header-even"
              onClick={NavigateAccount}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default ChangePasswordForm;
