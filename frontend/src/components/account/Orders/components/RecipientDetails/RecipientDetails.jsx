import React from 'react';
import styles from './RecipientDetails.module.scss';

const RecipientDetails = ({
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
              <span>Тел.</span> {phone}
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
export default RecipientDetails;
