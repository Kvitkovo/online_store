import React from 'react';
import Account from '../Account';
import styles from './ChangePasswordForm.module.scss';
import Button from '../../ui-kit/components/Button';
import { useNavigate } from 'react-router-dom';

const ChangePasswordForm = () => {
  const navigate = useNavigate();

  const NavigateAccount = () => {
    navigate('/account');
  };
  return (
    <div>
      <Account title="Редагування особистої інформації">
        <div className={styles.formContainer}>
          <h2 className={styles.title}> Зміна паролю</h2>
          <form action="">
            <div className={styles.passwordContainer}>
              <label htmlFor="password">Введіть новий пароль</label>
              <input
                className={styles.dataInput}
                id="password"
                name="password"
                type="password"
                placeholder="Новий пароль"
              />
            </div>

            <div className={styles.passwordContainer}>
              <label htmlFor="password">Повторіть новий пароль</label>
              <input
                className={styles.dataInput}
                id="password"
                name="password"
                type="password"
                placeholder="Повторіть пароль"
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
        </div>
      </Account>
    </div>
  );
};
export default ChangePasswordForm;
