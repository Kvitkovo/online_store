import React from 'react';
import { useSelector } from 'react-redux';
import { useWindowSize } from '../../../../../hooks/useWindowSize';
import DiscountPrice from '../../../../ui-kit/components/DiscountPrice';
import Divider from '../../../../ui-kit/components/Divider';
import IconButton from '../../../../ui-kit/components/IconButton';
import CountBlock from '../CountBlock';

import styles from './CartItem.module.scss';
import { ICONS } from '../../../../ui-kit/icons';

const CartItem = ({ items, count }) => {
  const cart = useSelector((state) => state.cartSliceReducer.cartItems);
  const { width } = useWindowSize();
  return (
    <div className={styles.itemsBlock}>
      {cart.map((item, index) => (
        <React.Fragment key={item.id}>
          <div className={styles.item}>
            <div className={styles.leftBlock}>
              <IconButton icon={<ICONS.TrashIcon />} />
              <div className={styles.blockImg}>
                <img src={item.image} alt={item.title} />
                <span>{item.title}</span>
              </div>
            </div>
            <div className={styles.rightBlock}>
              {item.status && (
                <div className={styles.pencilIcon}>
                  <IconButton
                    icon={<ICONS.PencilIcon />}
                    isBorderYellow={width > 767}
                  />
                </div>
              )}
              <CountBlock count={count} />
              <DiscountPrice
                oldPrice={item.oldPrice}
                actualPrice={item.price}
              />
            </div>
          </div>
          {index < items.length - 1 && (
            <div className={styles.divider}>
              <Divider />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CartItem;
