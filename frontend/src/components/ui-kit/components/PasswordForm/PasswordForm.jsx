import React, { useState } from 'react';
import styles from './PasswordForm.module.scss';
import ReactPasswordChecklist from 'react-password-checklist';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';

const PasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showPasswordReq, setShowPasswordReq] = useState(true);
  /*   const [successPopup, setSuccessPopup] = useState(false); */
  const navigate = useNavigate();

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
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\s]).{8,}$/;
    return passwordPattern.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError('Паролі не співпадають');
      return;
    } else {
      setConfirmPasswordError('');
    }
  };

  const onClose = () => {
    navigate('/');
  };
  return (
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
              rules={['minLength', 'number', 'capital', 'lowercase', 'letter']}
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
              Пароль має бути не менше 8 символів, складатись з цифр, маленьких
              та великих латинських літер.
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
  );
};

export default PasswordForm;
