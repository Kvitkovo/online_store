import React, { useEffect, useState } from 'react';
import styles from './Orders.module.scss';
import Account from '../Account';
import { ICONS } from '../../ui-kit/icons';
import IconButton from '../../ui-kit/components/IconButton';
import OrderItem from './components/OrderItem';
import RecipientDetails from './components/RecipientDetails/RecipientDetails';
import { getUsersOrders, cancelUserOrder } from '../../../services/order';
import ConfirmCancellationModal from './components/ConfirmCancellationModal';

const Orders = () => {
  const [showOrdersDetails, setShowOrderDetails] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [data, setData] = useState([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelOrderId, setCancellOrderId] = useState(null);
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
        const response = await getUsersOrders();
        setData(response);
      } catch (error) {
        console.error(
          'Помилка при отриманні замовлень коричтувача: ',
          error.message,
        )();
      }
    };
    fetchData();
  }, []);

  const toggleShowModal = () => {
    setShowCancelModal((prev) => !prev);
  };

  const cancelOrder = (id) => {
    setCancellOrderId(id);
    toggleShowModal();
  };

  const handleCancellOrder = async () => {
    await cancelUserOrder(cancelOrderId);
    toggleShowModal();
    const response = await getUsersOrders();
    setData(response);
  };

  return (
    <Account title="Вітаємо, Олена">
      <div>
        <h2 className={styles.title}> Мої замовлення</h2>
        <div className={`${styles.gridTable}` + ' ' + `${styles.line}`}>
          <div>Номер</div>
          <div>Дата</div>
          <div>Отримувач</div>
          <div>Сума</div>
          <div>Статус</div>
          <div></div>
        </div>
        {data &&
          data.map((order) => (
            <div key={order.id}>
              <div className={styles.gridTable}>
                <div
                  className={
                    showOrdersDetails === order.id
                      ? `${styles.number}`
                      : `${styles.numberActive}  + ' ' + ${styles.number}`
                  }
                  onClick={() => {
                    setShowOrderDetails(
                      order.id === showOrdersDetails ? null : order.id,
                    );
                    setQuantity(order.orderItems.length);
                  }}
                >
                  {order.id}
                </div>
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

                {statusMapping[order.status] === 'Новий' ? (
                  <IconButton
                    icon={<ICONS.deleteIcon />}
                    onClick={() => cancelOrder(order.id)}
                  ></IconButton>
                ) : (
                  ''
                )}
              </div>
              {showOrdersDetails === order.id && (
                <>
                  <div className={styles.item}></div>
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
                  <div className={styles.item}></div>
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
                </>
              )}
              <div className={styles.arrowDown}>
                <button
                  className={
                    showOrdersDetails === order.id
                      ? `${styles.btnArrowUp} + ' ' + ${styles.btn}`
                      : `${styles.btnArrowDown}  + ' ' + ${styles.btn}`
                  }
                  onClick={() => {
                    setShowOrderDetails(
                      order.id === showOrdersDetails ? null : order.id,
                    );
                    setQuantity(order.orderItems.length);
                  }}
                >
                  {showOrdersDetails === order.id ? (
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
            <img src="/images/no_orders.jpg" alt="no orders" />
          </div>
        )}
      </div>
      {showCancelModal && (
        <ConfirmCancellationModal
          toggleShowModal={toggleShowModal}
          onClose={toggleShowModal}
          onCancelOrder={handleCancellOrder}
        />
      )}
    </Account>
  );
};

export default Orders;
