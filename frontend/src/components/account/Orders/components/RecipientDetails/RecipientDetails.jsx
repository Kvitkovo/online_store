import React from 'react';
import styles from './RecipientDetails.module.scss';

const RecipientDetails = ({
  delivery,
  city,
  street,
  house,
  apartment,
  recipient,
  phone,
  quantity,
}) => {
  if (city === null) {
    city = 'Київ';
  }
  return (
    <>
      <div className={styles.flexData}>
        <div>
          <div className={styles.delivery}>
            <div>Доставка:</div>
            {delivery === 'PICKUP' ? (
              <p>Самовивіз</p>
            ) : (
              <div className={styles.address}>
                <span>місто</span> {city}
                <div>
                  <div>
                    <span>вул.</span> {street}
                  </div>
                  <div>
                    <span>буд.</span> {house}
                  </div>
                  <div>
                    <span> кв.</span> {apartment}
                  </div>
                </div>
              </div>
            )}
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
      <div className={styles.item}></div>
    </>
  );
};
export default RecipientDetails;
