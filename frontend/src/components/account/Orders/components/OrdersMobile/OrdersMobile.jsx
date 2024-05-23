import React from 'react';
import { ICONS } from '../../../../ui-kit/icons';
import styles from './OrdersMobile.module.scss';
import { useNavigate } from 'react-router-dom';

const OrdersMobile = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.header}>
        <ICONS.ArrowLeftIcon
          className={styles.iconBlack}
          onClick={() => navigate(-1)}
        />
        <div>Мої замовлення</div>
      </div>
    </div>
  );
};

export default OrdersMobile;
