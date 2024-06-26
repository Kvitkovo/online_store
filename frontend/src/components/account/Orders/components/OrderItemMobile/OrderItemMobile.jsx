import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrderById } from '../../../../../services/order';
import styles from './OrderItemMobile.module.scss';
import OrderItem from '../OrderItem/OrderItem';
import OrderDeleting from '../OrderDeleteIcon';
import RecipientDetails from '../RecipientDetails/RecipientDetails';
import { statusMapping } from '../../../../../constants/statusMapping';

const OrderItemMobile = () => {
  const { orderDetails } = useParams();
  const [order, setOrder] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOrderById(orderDetails);
        setOrder(response);
        setQuantity(response.orderItems.length);
      } catch (error) {
        console.error(
          'Помилка при отриманні замовлень кориcтувача: ',
          error.message,
        );
      }
    };
    fetchData();
  }, [orderDetails]);

  return (
    <div className={styles.orderDetailed}>
      <div className={styles.title}>
        <div className={styles.flexColumnAndGap}>
          <div>Номер</div>
          <div>№ {orderDetails}</div>
        </div>
        {order && statusMapping[order.status] === 'Новий' ? (
          <OrderDeleting
            orderId={order.id}
            onSuccessDelete={() => navigate('/account/orders')}
          />
        ) : (
          ''
        )}
      </div>
      <div>
        {order && (
          <div className={styles.orderDetails}>
            <div className={styles.dateAndStatus}>
              <div className={styles.flexColumnAndGap}>
                <div>Дата</div>
                <div>
                  {order.dateOfShipment.substring(8, 10) +
                    '.' +
                    order.dateOfShipment.substring(5, 7) +
                    '.' +
                    order.dateOfShipment.substring(0, 4)}
                </div>
              </div>
              <div className={styles.flexColumnAndGap}>
                <div>Статус</div>
                <div>{statusMapping[order.status]}</div>
              </div>
            </div>
            <div className={styles.flexColumnAndGap}>
              <div>Сума</div>
              <div className={styles.totalSum}>{order.totalSum} грн</div>
            </div>
            <RecipientDetails
              delivery={order.delivery}
              city={order.addressCity}
              street={order.addressStreet}
              house={order.addressHouse}
              apartment={order.addressApartment}
              recipient={order.receiverName}
              phone={order.receiverPhone}
              quantity={quantity}
            />

            <div className={styles.item}></div>
            <div className={styles.orderItemsBlock}>
              {order.orderItems.map((item, index) => (
                <OrderItem
                  key={index}
                  number={index + 1}
                  code={item.product?.id}
                  item={item.productTitle}
                  img={item.product?.mainImageSmallUrl}
                  itemQuantity={item.qty}
                  price={item.price}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderItemMobile;
