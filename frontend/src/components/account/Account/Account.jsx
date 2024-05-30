import React, { useState } from 'react';
import styles from './Account.module.scss';
import SideMenu from '../SideMenu';
import { useWindowSize } from '../../../hooks/useWindowSize';
import AccountMobileMenu from '../AccountMobileMenu';
import TitleMobile from './TitleMobile/TitleMobile';

const Account = ({ children, title }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(true);
  const { width } = useWindowSize();

  const isMobile = width <= 510;

  const handleShowMobileMenu = () => {
    setShowMobileMenu((prev) => {
      return !prev;
    });
  };

  return (
    <>
      {isMobile ? (
        <div>
          {showMobileMenu ? (
            <AccountMobileMenu onCloseMobileMenu={handleShowMobileMenu} />
          ) : (
            <>
              <TitleMobile onShowMobileMenu={handleShowMobileMenu} />
              <div className={styles.rightBlock}>{children}</div>
            </>
          )}
        </div>
      ) : (
        <div>
          <h2 className={styles.accountTitle}>{title}</h2>
          <div className={styles.gridTwoBlocks}>
            <SideMenu />
            <div className={styles.rightBlock}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};
export default Account;
