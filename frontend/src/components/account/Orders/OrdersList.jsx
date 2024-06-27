import React, { useState, useEffect } from 'react';
import styles from './OrdersList.module.scss';
import { getUsersOrders } from '../../../services/order';
import { useWindowSize } from '../../../hooks/useWindowSize';
import OrderDetails from './components/OrderDetails/OrderDetails';
import OrdersListMobile from './components/OrdersListMobile';
import OrdersListTablet from './components/OrderListTablet/OrdersListTablet';

const Orders = () => {
  const [data, setData] = useState([]);
  const { width } = useWindowSize();
  const isMobile = width <= 510;
  const isTablet = width > 510 && width <= 868;

  const fetchData = async () => {
    try {
      const response = await getUsersOrders();
      setData(response);
    } catch (error) {
      console.error(
        'Помилка при отриманні замовлень кориcтувача: ',
        error.message,
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        {data && data.length !== 0 ? (
          <div>
            {isMobile && <OrdersListMobile data={data} fetchData={fetchData} />}
            {isTablet && <OrdersListTablet data={data} fetchData={fetchData} />}

            {!isMobile && !isTablet && (
              <>
                <div>
                  <h2 className={styles.title}> Мої замовлення</h2>
                  <div
                    className={`${styles.gridTable}` + ' ' + `${styles.line}`}
                  >
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
                </div>
              </>
            )}
          </div>
        ) : (
          <div className={styles.noOrders}>
            <p>У вас поки що немає замовлень.</p>
            <img src="/images/no_orders.jpg" alt="no orders" />
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
