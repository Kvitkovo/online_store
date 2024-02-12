import React from 'react';
import IconButton from '../../../../ui-kit/components/IconButton';
import { ICONS } from '../../../../ui-kit/icons';
import { useDispatch } from 'react-redux';
import {
  decreaseCart,
  increaseCart,
} from '../../../../../redux/slices/cartSlice';
import styles from './CountBlock.module.scss';

const CountBlock = ({ item, type }) => {
  const dispatch = useDispatch();
  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart({ info: cartItem, type: type }));
  };

  const handleIncreaseCart = (cartItem) => {
    dispatch(increaseCart({ info: cartItem, type: type }));
  };

  return (
    <div className={styles.countBlock}>
      <IconButton
        icon={<ICONS.dash />}
        onClick={() => handleDecreaseCart(item)}
      />
      <div className={styles.field}>{item?.cardQuantity}</div>
      <IconButton
        icon={
          <ICONS.addComponent
            className={styles.icon}
            onClick={() => handleIncreaseCart(item)}
          />
        }
      />
    </div>
  );
};

export default CountBlock;
