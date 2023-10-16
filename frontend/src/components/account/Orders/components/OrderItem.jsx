import React from 'react';
import styles from './Order.module.scss';

const OrderItem = ({
  number,
  code,
  item,
  itemQuantity,
  price,
  city,
  street,
  house,
  apartment,
  recipient,
  phone,
  quantity,
}) => {
  return (
    <>
      <div className={styles.item}></div>
      <div className={styles.gridOrder}>
        <div>1 {number}</div>
        <div>код {code}</div>
        <div>Букет {item}</div>
        <div>{itemQuantity} шт</div>
        <div>{price} грн</div>
      </div>
      <div className={styles.item}></div>
      <div className={styles.flexData}>
        <div>
          <div className={styles.address}>
            <div>Доставка:</div>
            <div>
              <span>місто</span> {city}
            </div>
            <div>
              <span>вул.</span> {street} <span>буд.</span> {house}{' '}
              <span>кв.</span> {apartment}
            </div>
          </div>
          <div className={styles.recipient}>
            <div>Отримувач:</div>
            <div>{recipient}</div>
            <div>
              <span>Тел.</span> {phone}{' '}
            </div>
          </div>
        </div>
        <div className={styles.quantity}>
          <div>Кількість товарів: </div>
          <div>{quantity} шт</div>
        </div>
      </div>
    </>
  );
};
export default OrderItem;
