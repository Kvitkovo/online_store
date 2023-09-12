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
      <img
        src={props.image}
        alt="букет"
        className={
          props.status === 'NO_ACTIVE'
            ? `${styles.foto + ' ' + styles['foto-inactive']}`
            : `${styles.foto}`
        }
      />
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
        <div className={styles['text-flex']}>
          <p
            className={
              props.status === 'NO_ACTIVE'
                ? `${styles.inactive + ' ' + styles.price}`
                : `${styles.price}`
            }
          >
            Ціна
          </p>
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
          <div
            className={
              props.status === 'NO_ACTIVE'
                ? `${styles['actual-price'] + ' ' + styles.inactive}`
                : `${styles['actual-price']}`
            }
          >
            {props.price}
            <span
              className={
                props.status === 'NO_ACTIVE'
                  ? `${styles.currency + ' ' + styles.inactive}`
                  : `${styles.currency}`
              }
            >
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
