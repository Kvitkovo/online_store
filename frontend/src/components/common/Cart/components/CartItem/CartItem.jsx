import React from 'react';
import { useDispatch } from 'react-redux';
import { useWindowSize } from '../../../../../hooks/useWindowSize';
import DiscountPrice from '../../../../ui-kit/components/DiscountPrice';
import Divider from '../../../../ui-kit/components/Divider';
import IconButton from '../../../../ui-kit/components/IconButton';
import CountBlock from '../CountBlock';

import styles from './CartItem.module.scss';
import { ICONS } from '../../../../ui-kit/icons';
import { removeFromCart } from '../../../../../redux/slices/cartSlice';

const CartItem = ({ items }) => {
  const dispatch = useDispatch();
  const { width } = useWindowSize();

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  return (
    <div className={styles.itemsBlock}>
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          <div className={styles.item}>
            <IconButton
              icon={<ICONS.TrashIcon />}
              onClick={() => {
                handleRemoveFromCart(item);
              }}
            />
            <div className={styles.blockImg}>
              <img src={item.image} alt={item.title} />
              <span>{item.title}</span>
            </div>

            {item.status && (
              <div className={styles.pencilIcon}>
                <IconButton
                  icon={<ICONS.PencilIcon />}
                  isBorderYellow={width > 767}
                />
              </div>
            )}

            <CountBlock item={item} />
            <div
              className={`${
                item.oldPrice === item.price ? styles.priceWithoutDiscount : ''
              }`}
            >
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
