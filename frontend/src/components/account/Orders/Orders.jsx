import React from 'react';
import styles from './Orders.module.scss';
import Account from '../Account';
import { ICONS } from '../../ui-kit/icons';
import IconButton from '../../ui-kit/components/IconButton';

const Orders = () => {
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
            <>
              <div className={styles.gridTable} key={order.orderNumber}>
                <div>{order.orderNumber}</div>
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
              <div className={styles.arrowDown}>
                <button className={styles.btnArrowDown}>
                  {<ICONS.arrowDown />}
                </button>
              </div>
            </>
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
