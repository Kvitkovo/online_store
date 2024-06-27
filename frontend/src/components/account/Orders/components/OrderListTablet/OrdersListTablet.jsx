import React, { useState } from 'react';
import styles from './OrdersListTablet.module.scss';
import { Link } from 'react-router-dom';
import OrderDeleting from '../OrderDeleteIcon/OrderDeleteIcon';
import { statusMapping } from '../../../../../constants/statusMapping';
import OrderItem from '../OrderItem';

const OrdersListTablet = ({ data, fetchData }) => {
  const [showOrdersDetails, setShowOrderDetails] = useState(null);
  return (
    <div className={styles.ordersListMobile}>
      {data.map((order) => (
        <div key={order.id} className={styles.orderList}>
          <div className={styles.blockNumber}>
            <div className={styles.title}>
              <div className={styles.number}>
                <div>Номер</div>
                <Link
                  to={`/account/orders/${order.id}`}
                  className={styles.link}
                >
                  № {order.id}
                </Link>
              </div>
              <div className={styles.cancelOrder}>
                <OrderDeleting orderId={order.id} onSuccessDelete={fetchData} />
              </div>
            </div>
          </div>
          <div className={styles.dateAndStatus}>
            <div className={styles.date}>
              <div>Дата</div>
              <div>
                {order.dateOfShipment.substring(8, 10) +
                  '.' +
                  order.dateOfShipment.substring(5, 7) +
                  '.' +
                  order.dateOfShipment.substring(0, 4)}
              </div>
            </div>
            <div className={styles.status}>
              <div>Статус</div>
              <div>{statusMapping[order.status]}</div>
            </div>
          </div>
          <div className={styles.totalAmount}>
            <div>Сума</div>
            <div>{order.totalSum} грн</div>
          </div>
          <div className={styles.receiver}>
            <div>Отримувач</div>
            <div>{order.receiverName}</div>
          </div>
          <div
            className={styles.details}
            onClick={() => {
              setShowOrderDetails(
                order.id === showOrdersDetails ? null : order.id,
              );
            }}
          >
            Детально
          </div>
          {showOrdersDetails === order.id && (
            <>
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
              <div className={styles.item}></div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
export default OrdersListTablet;
