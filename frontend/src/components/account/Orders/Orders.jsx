import React, { useState } from 'react';
import styles from './Orders.module.scss';
import Account from '../Account';
import { ICONS } from '../../ui-kit/icons';
import IconButton from '../../ui-kit/components/IconButton';
import OrderItem from './components/OrderItem';
import RecipientDetails from './components/RecipientDetails/RecipientDetails';

const Orders = () => {
  const [showOrdersDetails, setShowOrderDetails] = useState(null);
  const [quantity, setQuantity] = useState(0);

  const data = [
    {
      orderNumber: '№0000001',
      date: '01.10.2023',
      recipient: 'Шевченко Олена Олегівна',
      totalPrice: '0000000',
      status: 'Новий',
      orderItems: [
        {
          code: '3',
          item: 'Букет весняний',
          img: '/images/bouquet_order.jpg',
          quantity: '1',
          price: '200',
        },
        {
          code: '4',
          item: 'Букет 101 троянда',
          img: '/images/bouquet_order.jpg',
          quantity: '1',
          price: '300',
        },
        {
          code: '13',
          item: 'Букет осіння мрія',
          img: '/images/bouquet_order.jpg',
          quantity: '1',
          price: '500',
        },
      ],
      city: 'Київ',
      street: 'Михайла Грушевського',
      house: '30',
      apartment: '329',
      phone: '+38(067)0000000',
    },
    {
      orderNumber: '№0000002',
      date: '02.10.2023',
      recipient: 'Сидорчук Валерія',
      totalPrice: '0000000',
      status: 'Новий',
      orderItems: [
        {
          code: '5',
          item: 'Букет 101 троянда',
          img: '/images/bouquet_order.jpg',
          quantity: '1',
          price: '300',
        },
        {
          code: '6',
          item: 'Букет тюльпанів',
          img: '/images/bouquet_order.jpg',
          quantity: '1',
          price: '700',
        },
      ],
      city: 'Київ',
      street: 'Михайла Грушевського',
      house: '30',
      apartment: '329',
      phone: '+38(067)0000000',
    },
    {
      orderNumber: '№0000003',
      date: '03.10.2023',
      recipient: 'Корнійчук Наталія',
      totalPrice: '0000000',
      status: 'В обробці',
      orderItems: [
        {
          code: '7',
          item: 'Букет 101 троянда',
          img: '/images/bouquet_order.jpg',
          quantity: '1',
          price: '400',
        },
      ],
      city: 'Київ',
      street: 'Михайла Грушевського',
      house: '30',
      apartment: '329',
      phone: '+38(067)0000000',
    },
  ];

  return (
    <Account title="Вітаємо, Олена">
      <div>
        <h2 className={styles.title}> Мої замовлення</h2>
        <div className={styles.gridTable}>
          <div>Номер</div>
          <div>Дата</div>
          <div>Отримувач</div>
          <div>Сума</div>
          <div>Статус</div>
          <div></div>
        </div>
        {data &&
          data.map((order) => (
            <div key={order.orderNumber}>
              <div className={styles.gridTable}>
                <div
                  className={
                    showOrdersDetails === order.orderNumber
                      ? `${styles.number}`
                      : `${styles.numberActive}  + ' ' + ${styles.number}`
                  }
                  onClick={() => {
                    setShowOrderDetails(
                      order.orderNumber === showOrdersDetails
                        ? null
                        : order.orderNumber,
                    );
                    setQuantity(order.orderItems.length);
                  }}
                >
                  {order.orderNumber}
                </div>
                <div>{order.date}</div>
                <div>{order.recipient}</div>
                <div>{order.totalPrice} грн</div>
                <div>{order.status}</div>
                <div>
                  {order.status === 'Новий' ? (
                    <IconButton icon={<ICONS.deleteIcon />}></IconButton>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              {showOrdersDetails === order.orderNumber && (
                <>
                  <div className={styles.item}></div>
                  {order.orderItems.map((item, index) => (
                    <OrderItem
                      key={index}
                      number={index + 1}
                      code={item.code}
                      item={item.item}
                      img={item.img}
                      itemQuantity={item.quantity}
                      price={item.price}
                    />
                  ))}
                  <div className={styles.item}></div>
                  <RecipientDetails
                    city={order.city}
                    street={order.street}
                    house={order.house}
                    apartment={order.apartment}
                    recipient={order.recipient}
                    phone={order.phone}
                    quantity={quantity}
                  />
                </>
              )}
              <div className={styles.arrowDown}>
                <button
                  className={
                    showOrdersDetails === order.orderNumber
                      ? `${styles.btnArrowUp} + ' ' + ${styles.btn}`
                      : `${styles.btnArrowDown}  + ' ' + ${styles.btn}`
                  }
                  onClick={() => {
                    setShowOrderDetails(
                      order.orderNumber === showOrdersDetails
                        ? null
                        : order.orderNumber,
                    );
                    setQuantity(order.orderItems.length);
                  }}
                >
                  {showOrdersDetails === order.orderNumber ? (
                    <ICONS.arrowUpWhite />
                  ) : (
                    <ICONS.arrowDown />
                  )}
                </button>
              </div>
            </div>
          ))}

        {!data && (
          <div className={styles.noOrders}>
            <p>У вас поки що немає замовлень.</p>
            <img src="/images/no_orders.jpg" alt="" />
          </div>
        )}
      </div>
    </Account>
  );
};

export default Orders;
