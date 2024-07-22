import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/ui-kit/components/Button';
import { useScroll } from '../../hooks/useScroll';
import styles from './PlacedOrder.module.scss';

const PlasedOrder = () => {
  useScroll({
    top: 0,
    left: 0,
    scrollOnMount: true,
  });

  const { orderNumber } = useParams();
  const navigate = useNavigate();

  const goToMainPage = () => {
    navigate('/');
  };
  return (
    <div className={styles.placedOrder}>
      <div className={styles.coverBg}></div>
      <div className={styles.container}>
        <h1 className={styles.title}>Дякуємо за замовлення!</h1>
        <p className={styles.orderInformation}>
          Ваше замовлення за номером <span>№{orderNumber}</span> успішно
          оформлене.
        </p>
        <div className={styles.btn}>
          <Button
            label="На головну"
            padding="padding-even"
            onClick={goToMainPage}
          />
        </div>
      </div>
    </div>
  );
};

export default PlasedOrder;
