import React from 'react';
import styles from './Account.module.scss';
import SideMenu from '../SideMenu';

const Account = ({ children, title }) => {
  return (
    <div>
      <h2 className={styles.accountTitle}>{title}</h2>
      <div className={styles.gridTwoBlocks}>
        <SideMenu />
        {children}
      </div>
    </div>
  );
};
export default Account;
