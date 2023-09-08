import React from 'react';
import styles from './Card.module.scss';

const Card = (props) => {
  return (
    <div
      className={
        props.status === 'NO_ACTIVE'
          ? `${styles.card + ' ' + styles.inactive}`
          : `${styles.card}`
      }
    >
      <img src={props.image} alt="букет" />
      <h3>{props.title}</h3>
      <div
        className={
          props.discount === 0 ? `${styles.hide}` : `${styles.discount}`
        }
      >
        {props.discount}%
      </div>
      <div className={styles['card-info']}>
        <p>Ціна</p>
        <div
          className={
            props.discount === 0
              ? `${styles['hide-price']}`
              : `${styles['old-price']}`
          }
        >
          {props.oldPrice} грн
        </div>
        <div className={styles['card-flex-bottom']}>
          <div className={styles['actual-price']}>
            {props.price}
            <span>грн</span>
          </div>
          <div
            className={
              props.status === 'NO_ACTIVE'
                ? `${styles.hide}`
                : `${styles.icons}`
            }
          >
            <img
              src="./images/bouquet-card.svg"
              alt="додати в букет"
              className={
                props.bouquet === false ? `${styles.hide}` : `${styles.bouquet}`
              }
            />
            <img
              src="./images/cart-card.svg"
              alt="додати в корзину"
              className="cart"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
