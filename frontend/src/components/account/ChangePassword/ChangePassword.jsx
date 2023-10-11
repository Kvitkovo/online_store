import React from 'react';
import Account from '../Account';
import styles from './ChangePassword.module.scss';
const ChangePassword = () => {
  return (
    <Account title="Редагування особистої інформації">
      <h2 className={styles.title}> Зміна паролю</h2>
    </Account>
  );
};
export default ChangePassword;
