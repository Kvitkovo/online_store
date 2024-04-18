import React from 'react';
import { useParams } from 'react-router-dom';

const OrderItemDetailed = () => {
  const { orderDetails } = useParams();

  return <div>Деталі замовлення № {orderDetails}</div>;
};

export default OrderItemDetailed;
