import React, { useState, useEffect } from 'react';
import styles from './OrdersList.module.scss';
import Account from '../Account';
import { getUsersOrders } from '../../../services/order';
import { useSelector } from 'react-redux';
import OrderDetails from './components/OrderDetails/OrderDetails';

const Orders = () => {
  const userData = useSelector((state) => state.user.user);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getUsersOrders();
      setData(response);
    } catch (error) {
      console.error(
        'Помилка при отриманні замовлень коричтувача: ',
        error.message,
      )();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Account title={`Вітаємо, ${userData ? userData.firstName : ''}`}>
      <div>
        {data && data.length !== 0 ? (
          <>
            <h2 className={styles.title}> Мої замовлення</h2>
            <div className={`${styles.gridTable}` + ' ' + `${styles.line}`}>
              <div>Номер</div>
              <div>Дата</div>
              <div>Отримувач</div>
              <div>Сума</div>
              <div>Статус</div>
              <div></div>
            </div>
            {data.map((order) => (
              <OrderDetails
                key={order.id}
                order={order}
                fetchData={fetchData}
              />
            ))}
          </>
        ) : (
          <div className={styles.noOrders}>
            <p>У вас поки що немає замовлень.</p>
            <img src="/images/no_orders.jpg" alt="no orders" />
          </div>
        )}
      </div>
    </Account>
  );
};

export default Orders;
