import React from 'react';
import styles from './Card.module.scss';
import IconButton from '../ui-kit/components/IconButton';
import { ICONS } from '../ui-kit/icons';
import Discount from '../ui-kit/components/Discount/Discount';

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
      <h3>
        {props.title.charAt(0).toUpperCase() +
          props.title.substring(1).toLowerCase()}
      </h3>
      <div
        className={
          props.discount === 0 ? `${styles.hide}` : `${styles.discount}`
        }
      >
        <Discount discount={props.discount} />
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
