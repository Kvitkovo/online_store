import React from 'react';
import { ICONS } from '../../../ui-kit/icons';
import styles from './TitleMobile.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';

const TitleMobile = ({ onShowMobileMenu }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const TitleDefinition = () => {
    if (/\/account\/orders\/[0-9]/.test(location.pathname)) {
      const orderId = location.pathname.split('/')[3];
      return `Замовлення № ${orderId}`;
    }

    switch (location.pathname) {
      case '/account':
        return 'Контакти';
      case '/account/orders':
        return 'Мої замовлення';
      default:
        return '';
      case '/account/change-details':
        return 'Редагування данних';
      case '/account/change-password':
        return 'Заміна паролю';
    }
  };
  const handleLeftIconClick = () => {
    if (
      location.pathname == '/account' ||
      location.pathname == '/account/orders'
    ) {
      onShowMobileMenu();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={styles.header}>
      <ICONS.ArrowLeftIcon
        className={styles.iconBlack}
        onClick={handleLeftIconClick}
      />
      <div>{TitleDefinition()}</div>
    </div>
  );
};

export default TitleMobile;
