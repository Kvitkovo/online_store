import React from 'react';
import { Link } from 'react-router-dom';

const OrderStatus = () => {
  return (
    <>
      <div>Статус замовлення</div>
      <Link to="/account">Особистий кабінет</Link>
    </>
  );
};

export default OrderStatus;
