import React from 'react';
import styles from './Card.module.scss';
import IconButton from '../ui-kit/components/IconButton';
import { ICONS } from '../ui-kit/icons';
import Discount from '../ui-kit/components/Discount/Discount';

const Card = (props) => {
  const inactive = (classNameActive, classNameInActive) => {
    if (props.status === 'NO_ACTIVE')
      return classNameActive + ' ' + classNameInActive;
    else return classNameActive;
  };
  return (
    <div className={styles.card}>
      <img
        src={props.image}
        alt="букет"
        className={inactive(styles.foto, styles['foto-inactive'])}
      />
      <h3>{props.title}</h3>
      <div
        className={
          props.discount === 0 ? `${styles.hide}` : `${styles.discount}`
        }
      >
        <Discount discount={props.discount} />
      </div>
      <div className={styles['card-info']}>
        <div className={styles['text-flex']}>
          <p className={inactive(styles.price, styles.inactive)}>Ціна</p>
          {props.status === 'NO_ACTIVE' ? (
            <p className={styles['out-of-stock']}>Немає в наявності</p>
          ) : (
            <span></span>
          )}
        </div>
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
          <div className={inactive(styles['actual-price'], styles.inactive)}>
            {props.price}
            <span className={inactive(styles.currency, styles.inactive)}>
              грн
            </span>
          </div>
          <div
            className={
              props.status === 'NO_ACTIVE'
                ? `${styles.hide}`
                : `${styles.icons}`
            }
          >
            <div
              className={
                props.bouquet === false ? `${styles.hide}` : `${styles.bouquet}`
              }
            >
              <IconButton icon={<ICONS.BouquetIcon />} />
            </div>
            <IconButton icon={<ICONS.CartIcon />} isBorderYellow={true} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
