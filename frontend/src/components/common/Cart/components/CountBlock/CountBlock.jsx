import React from 'react';
import IconButton from '../../../../ui-kit/components/IconButton';
import { ICONS } from '../../../../ui-kit/icons';
import { useDispatch } from 'react-redux';
import { updateQuantityInCart } from '../../../../../redux/slices/cartSlice';
import styles from './CountBlock.module.scss';

const CountBlock = ({ item, type }) => {
  const { cardQuantity, id } = item;
  const dispatch = useDispatch();
  const handleChangeQuantity = (id, quantity) => {
    dispatch(updateQuantityInCart({ id: id, quantity: quantity, type: type }));
  };

  return (
    <div className={styles.countBlock}>
      <IconButton
        icon={<ICONS.dash className={styles.icon} />}
        disabled={cardQuantity === 1}
        onClick={() => handleChangeQuantity(id, cardQuantity - 1)}
      />
      <input
        type="number"
        className={styles.field}
        value={cardQuantity}
        onChange={(e) => handleChangeQuantity(id, e.target.value)}
      />
      <IconButton
        icon={<ICONS.addComponent className={styles.icon} />}
        onClick={() => handleChangeQuantity(id, cardQuantity + 1)}
        disabled={cardQuantity > 9998}
      />
    </div>
  );
};

export default CountBlock;
