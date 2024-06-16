import React, { useState } from 'react';
import styles from './Account.module.scss';
import SideMenu from '../SideMenu';
import { useWindowSize } from '../../../hooks/useWindowSize';
import TitleMobile from './TitleMobile/TitleMobile';
import Path from '../../../pages/CardPage/components/Path';

const Account = ({ children }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(true);
  const { width } = useWindowSize();
  const isMobile = width <= 510;
  const storedUserData = JSON.parse(localStorage.getItem('userfetchedData'));

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
            <>
              <Path
                currentPageData={{ name: 'Кабінет' }}
                currentPageType={'section'}
              />
              <h2 className={styles.accountTitle}>
                Вітаємо, {storedUserData ? storedUserData.firstName : ''}
              </h2>
              <SideMenu onCloseMobileMenu={handleShowMobileMenu} />
            </>
          ) : (
            <>
              <TitleMobile onShowMobileMenu={handleShowMobileMenu} />
              <div className={styles.rightBlock}>{children}</div>
            </>
          )}
        </div>
      ) : (
        <div>
          <h2 className={styles.accountTitle}>
            Вітаємо, {storedUserData ? storedUserData.firstName : ''}
          </h2>
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
