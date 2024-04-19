import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../../../../services/order';
import styles from './OrderItemDetailed.module.scss';
import OrderItem from '../OrderItem/OrderItem';
import IconButton from '../../../../ui-kit/components/IconButton';
import { ICONS } from '../../../../ui-kit/icons';

const OrderItemDetailed = () => {
  const { orderDetails } = useParams();
  const [order, setOrder] = useState(null);
  const statusMapping = {
    NEW: 'Новий',
    ACCEPT: 'Прийнятий',
    IS_DELIVERED: 'Доставляється',
    DONE: 'Виконаний',
    CANCELED: 'Скасований',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOrderById(orderDetails);
        setOrder(response);
      } catch (error) {
        console.error(
          'Помилка при отриманні замовлень коричтувача: ',
          error.message,
        )();
      }
    };
    fetchData();
  }, [orderDetails]);

  return (
    <div className={styles.orderDetailed}>
      <div className={styles.title}>
        <div>
          <div>Номер</div>
          <div>{orderDetails}</div>
        </div>

        {order && statusMapping[order.status] === 'Новий' ? (
          <div className={styles.deleteIconWithText}>
            Скасувати
            <IconButton
              icon={<ICONS.deleteIcon />}
              // onClick={() => cancelOrder(order.id)}
            ></IconButton>
          </div>
        ) : (
          ''
        )}
      </div>

      <div>
        {order && (
          <div key={order.id}>
            <div className={styles.gridTable}>
              <div>
                {order.dateOfShipment.substring(8, 10) +
                  '.' +
                  order.dateOfShipment.substring(5, 7) +
                  '.' +
                  order.dateOfShipment.substring(0, 4)}
              </div>
              <div>{order.receiverName}</div>
              <div>{order.totalSum} грн</div>
              <div>{statusMapping[order.status]}</div>
            </div>

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
            {/* <div className={styles.item}></div> */}
            {/* <RecipientDetails
                    delivery={order.delivery}
                    city={order.addressCity}
                    street={order.addressStreet}
                    house={order.addressHouse}
                    apartment={order.addressApartment}
                    recipient={order.receiverName}
                    phone={order.receiverPhone}
                    quantity={quantity}
                  /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderItemDetailed;
