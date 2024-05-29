import React from 'react';
import { ICONS } from '../../../../ui-kit/icons';
import styles from './TitleMobile.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';

const TitleMobile = ({ title, onShowMobileMenu }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
      <div>{title}</div>
    </div>
  );
};

export default TitleMobile;
