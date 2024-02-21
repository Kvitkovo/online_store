import React from 'react';
import { useParams } from 'react-router-dom';

const PlasedOrder = () => {
  const { orderNumber } = useParams();
  return (
    <div>
      <h1>Дякуємо за замовлення!</h1>
      <p>Ваше замовлення номер {orderNumber}</p>
    </div>
  );
};

export default PlasedOrder;
