import React, { useState } from 'react';
import styles from './OrderDetails.module.scss';
import OrderDeleting from '../OrderDeleteIcon/OrderDeleteIcon';
import OrderItem from '../OrderItem';
import RecipientDetails from '../RecipientDetails/RecipientDetails';
import { ICONS } from '../../../../ui-kit/icons';
import { statusMapping } from '../../../../../constants/statusMapping';

const OrderDetails = ({ order, fetchData }) => {
  const [showOrdersDetails, setShowOrderDetails] = useState(null);
  const [quantity, setQuantity] = useState(0);

  return (
    <div>
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
          <OrderDeleting orderId={order.id} onSuccessDelete={fetchData} />
        ) : (
          ''
        )}
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
  );
};

export default OrderDetails;
