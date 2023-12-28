import React from 'react';
import Account from '../Account';
import styles from './ChangePassword.module.scss';
import Button from '../../ui-kit/components/Button';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const navigate = useNavigate();

  const NavigateAccount = () => {
    navigate('/account');
  };
  return (
    <div>
      <Account title="Редагування особистої інформації">
        <h2 className={styles.title}> Зміна паролю</h2>
        <div>
          <form action="">
            <div className={styles.passwordContainer}>
              <label htmlFor="password">Введіть старий пароль</label>
              <input
                className={styles.dataInput}
                id="password"
                name="password"
                type="password"
                placeholder="Введіть ваш пароль"
              />
            </div>

            <div className={styles.btnContainer}>
              <Button
                variant="primary"
                label="Підтвердити"
                padding="padding-sm"
                type="submit"
                /* onClick={handleSubmit} */
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
export default ChangePassword;
