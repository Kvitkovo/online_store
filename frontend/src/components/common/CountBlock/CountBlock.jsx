import React from 'react';
import IconButton from '../../ui-kit/components/IconButton';
import { ICONS } from '../../ui-kit/icons';
import { useDispatch } from 'react-redux';
import { updateQuantityInCart } from '../../../redux/slices/cartSlice';
import styles from './CountBlock.module.scss';

const CountBlock = ({ item, type }) => {
  const { cardQuantity, id } = item;
  const dispatch = useDispatch();
  const handleChangeQuantity = (id, quantity) => {
    let qty = quantity;
    if (quantity <= 0) {
      qty = 1;
    }
    if (quantity > 9999) {
      qty = 9999;
    }
    dispatch(
      updateQuantityInCart({ id: id, quantity: Number(qty), type: type }),
    );
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
        min="1"
        max="9999"
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
