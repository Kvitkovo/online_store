import React from 'react';
import Modals from '../../Modals/Modals';
import styles from './LoginModal.module.scss';
import IconButton from '../../../ui-kit/components/IconButton';
import { ICONS } from '../../../ui-kit/icons';
import Button from '../../../ui-kit/components/Button';

const LoginModal = ({ toggleLogin }) => {
  return (
    <Modals type="login" onClick={toggleLogin}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <p>Вхід</p>
          <p>Реєстрація</p>
        </div>
        <div className={styles.closeBtn}>
          <IconButton icon={<ICONS.closeMobile />} />
        </div>
      </div>

      <div className={styles.formContainer}>
        <form /* onSubmit={handleSubmit} */>
          <div className={styles.dataContainer}>
            <label className={styles.labelData} htmlFor="email">
              Ел. пошта <span>*</span>
            </label>

            <input
              id="email"
              className={styles.dataInput}
              type="email"
              pattern="^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
              placeholder="Введіть електронну пошту"
              /*               value={email}
              onChange={(e) => setEmail(e.target.value.trim())} */
            />
            {/*             {submitted && !email && (
              <p className={styles.errorMessage}>Введіть електронну пошту</p>
            )}
            {submitted && email && !validateEmail(email) && (
              <p className={styles.errorMessage}>
                Невірний формат електронної пошти
              </p>
            )} */}
          </div>
          <div className={styles.dataContainer}>
            <label className={styles.labelData} htmlFor="password">
              Пароль <span>*</span>
            </label>

            <input
              id="password"
              name="password"
              className={styles.dataInput}
              type="text"
              placeholder="Введіть ваш пароль"
              /*    onChange={(e) => setName(e.target.value.trim())} */
            />
            {/*             {submitted && !name && (
              <p className={styles.errorMessage}>Введіть ваше ім`я</p>
            )} */}
          </div>

          <div className={styles.button}>
            <Button
              variant="primary"
              label="Увійти"
              padding="padding-sm"
              isFullWidth={true}
              type="submit"
            />
          </div>
          <div>
            <p>або</p>
          </div>

          <div>
            <p>Забули пароль?</p>
          </div>
        </form>
      </div>
    </Modals>
  );
};
export default LoginModal;
