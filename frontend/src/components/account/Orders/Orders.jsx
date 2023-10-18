import React, { useState } from 'react';
import styles from './Orders.module.scss';
import Account from '../Account';
import { ICONS } from '../../ui-kit/icons';
import IconButton from '../../ui-kit/components/IconButton';
import OrderItem from './components/OrderItem';

const Orders = () => {
  const [showOrdersDetails, setShowOrderDetails] = useState(null);

  const data = [
    {
      orderNumber: '№0000001',
      date: '01.10.2023',
      recipient: 'Шевченко Олена Олегівна',
      totalPrice: '0000000',
      status: 'Новий',
    },
    {
      orderNumber: '№0000002',
      date: '02.10.2023',
      recipient: 'Шевченко Олена Олегівна',
      totalPrice: '0000000',
      status: 'Новий',
    },
    {
      orderNumber: '№0000003',
      date: '03.10.2023',
      recipient: 'Шевченко Олена Олегівна',
      totalPrice: '0000000',
      status: 'В обробці',
    },
  ];

  // const handleClick = () => {
  //   setShowOrderDetails(!showOrdersDetails);
  // };
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
                  onClick={() =>
                    setShowOrderDetails(
                      order.orderNumber === showOrdersDetails
                        ? null
                        : order.orderNumber,
                    )
                  }
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
                <OrderItem
                  city="Київ"
                  street="Михайла Грушевського"
                  house="30\1"
                  apartment="329"
                  recipient="Шевченко Олена Олегівна"
                  phone="+38(067)0000000"
                  quantity="4"
                />
              )}
              <div className={styles.arrowDown}>
                <button
                  className={
                    showOrdersDetails === order.orderNumber
                      ? `${styles.btnArrowUp} + ' ' + ${styles.btn}`
                      : `${styles.btnArrowDown}  + ' ' + ${styles.btn}`
                  }
                  onClick={() =>
                    setShowOrderDetails(
                      order.orderNumber === showOrdersDetails
                        ? null
                        : order.orderNumber,
                    )
                  }
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
