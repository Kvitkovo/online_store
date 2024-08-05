import React, { useState } from 'react';
import styles from './Account.module.scss';
import SideMenu from '../SideMenu';
import { useWindowSize } from '../../../hooks/useWindowSize';
import TitleMobile from './TitleMobile/TitleMobile';
import Path from '../../../pages/CardPage/components/Path';
import { useLocation } from 'react-router-dom';
import { useScroll } from '../../../hooks';

const Account = ({ children }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(true);
  const { width } = useWindowSize();
  const isMobile = width <= 510;
  const storedUserData = JSON.parse(localStorage.getItem('userfetchedData'));
  useScroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
    scrollOnMount: true,
  });
  const location = useLocation();

  const handleShowMobileMenu = () => {
    setShowMobileMenu((prev) => {
      return !prev;
    });
  };
  const getPageData = () => {
    switch (location.pathname) {
      case '/account/orders':
        return { name: 'Мої замовлення' };
      case '/account/change-details':
        return { name: 'Контактні дані' };
      case '/account/change-password':
        return { name: 'Зміна паролю' };
      default:
        return { name: 'Кабінет' };
    }
  };

  const getTitle = () => {
    switch (location.pathname) {
      case '/account/change-details':
      case '/account/change-password':
        return 'Редагування особистої інформації';
      default:
        return `Вітаємо, ${storedUserData ? storedUserData.firstName : ''}`;
    }
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
          <Path currentPageData={getPageData()} currentPageType={'profile'} />
          <h2 className={styles.accountTitle}>{getTitle()}</h2>
          <div className={styles.gridTwoBlocks}>
            <div className={styles.menuBlock}>
              <SideMenu />
            </div>
            <div className={styles.rightBlock}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};
export default Account;
