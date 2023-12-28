import React from 'react';
import styles from './Account.module.scss';
import SideMenu from '../SideMenu';
import { useNavigate } from 'react-router-dom';

const Account = ({ children, title, updateLoginStatus }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
    updateLoginStatus(false);
  };
  return (
    <div>
      <h2 className={styles.accountTitle}>{title}</h2>
      <div className={styles.gridTwoBlocks}>
        <SideMenu handleLogout={handleLogout} />
        <div className={styles.rightBlock}>{children}</div>
      </div>
    </div>
  );
};
export default Account;
