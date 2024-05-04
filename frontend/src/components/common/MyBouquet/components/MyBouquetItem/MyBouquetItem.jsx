import React from 'react';

import CountBlock from '../../../CountBlock';
import Divider from '../../../../ui-kit/components/Divider';
import IconButton from '../../../../ui-kit/components/IconButton';
import { removeFromCart } from '../../../../../redux/slices/cartSlice';

import styles from './MyBouqetItem.module.scss';
import { ICONS } from '../../../../ui-kit/icons';
import { useDispatch } from 'react-redux';
import DiscountPrice from '../../../../ui-kit/components/DiscountPrice';

const MyBouquetItem = React.memo(({ items }) => {
  const dispatch = useDispatch();
  const handleRemovePosition = (cartItem) => {
    dispatch(removeFromCart({ info: cartItem, type: 'bouquet' }));
  };

  return (
    <ul className={styles.itemsBlock}>
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          <li className={styles.item}>
            <div className={styles.icon}>
              <IconButton
                icon={<ICONS.CloseIcon />}
                onClick={() => handleRemovePosition(item)}
              />
            </div>
            <div className={styles.blockImg}>
              <img src={item.image} alt={item.title} />
              <span>{item.title}</span>
            </div>
            <div className={styles.countBlock}>
              <CountBlock item={item} type={'bouquet'} />
            </div>
            <div className={styles.price}>
              <DiscountPrice
                oldPrice={item.price}
                actualPrice={item.priceWithDiscount}
              />
            </div>
          </li>
          {index < items.length - 1 && (
            <div className={styles.divider}>
              <Divider />
            </div>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
});

export default MyBouquetItem;
