import React, { useState } from 'react';
import Account from '../Account';
import styles from './ChangePasswordForm.module.scss';
import Button from '../../ui-kit/components/Button';
import { useNavigate } from 'react-router-dom';
/* eslint-disable max-len */
import { changePassword } from '../../../services/userData/changePassword.service';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const NavigateAccount = () => {
    navigate('/account');
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const response = await changePassword({
        email: localStorage.getItem('email'),
        oldPassword,
        newPassword,
      });
      if (response.success) {
        navigate('/account');
      } else {
        setError(response.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <Account title="Редагування особистої інформації">
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
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
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
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className={styles.btnContainer}>
              <Button
                variant="primary"
                label="Підтвердити"
                padding="padding-sm"
                type="submit"
              />
              <Button
                variant="no-border-hovered"
                label="Скасувати"
                padding="padding-header-even"
                onClick={NavigateAccount}
              />
            </div>
          </form>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </Account>
    </div>
  );
};
export default ChangePassword;
