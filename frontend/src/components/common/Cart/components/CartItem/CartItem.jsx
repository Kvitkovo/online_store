import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useWindowSize } from '../../../../../hooks/useWindowSize';
import DiscountPrice from '../../../../ui-kit/components/DiscountPrice';
import { ICONS } from '../../../../ui-kit/icons';
import Divider from '../../../../ui-kit/components/Divider';
import IconButton from '../../../../ui-kit/components/IconButton';
import CountBlock from '../../../CountBlock';
import { usePopups } from '../../../../../hooks/usePopups';
import {
  clearCart,
  removeFromCart,
} from '../../../../../redux/slices/cartSlice';
import ConfirmationPopup from '../../../MyBouquet/components/ConfirmationPopup';
import { useModalEffect } from '../../../../../hooks/useModalEffect';
import MyBouquet from '../../../MyBouquet';
import styles from './CartItem.module.scss';

const CartItem = ({ items, cartClassName, editBouquet }) => {
  const dispatch = useDispatch();

  const { width } = useWindowSize();
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart({ info: cartItem, type: 'cart' }));
  };

  const { isOpenMyBouquet, toggleMyBouquet, getPrevData } = usePopups();

  const editOrderedBouquet = (item) => {
    dispatch(clearCart({ type: 'bouquet' }));
    localStorage.setItem(
      'bouquet',
      JSON.stringify(item.orderItemsCompositions),
    );
    getPrevData('bouquet');
    dispatch(removeFromCart({ info: item, type: 'cart' }));
    toggleMyBouquet();
  };

  useModalEffect(isOpenMyBouquet);

  const handleSetConfirmation = useCallback(
    (item) => {
      setConfirmationOpen(false);
      editBouquet(item);
    },
    [editBouquet],
  );

  const handleEditing = (item) => {
    if (editBouquet) {
      editBouquet(item);
    } else {
      editOrderedBouquet(item);
    }
  };

  return (
    <div
      className={
        cartClassName === 'itemsCart' ? styles.itemsCart : styles.itemsOrder
      }
    >
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          <div className={styles.item}>
            <div className={styles.trashIcon}>
              <IconButton
                icon={<ICONS.TrashIcon />}
                onClick={() => {
                  handleRemoveFromCart(item);
                }}
              />
            </div>
            <div className={styles.blockImg}>
              <img src={item.image} alt={item.title} />
              <span>{item.title}</span>
              {item?.orderItemsCompositions && (
                <div className={styles.pencilIcon}>
                  <IconButton
                    icon={<ICONS.PencilIcon />}
                    isBorderYellow={width > 767}
                    onClick={() => handleEditing(item)}
                  />
                  {isConfirmationOpen && (
                    <ConfirmationPopup
                      setIsOpen={setConfirmationOpen}
                      confirmedAction={() => handleSetConfirmation(item)}
                      action={'Продовжити'}
                    />
                  )}
                </div>
              )}
            </div>
            <div className={styles.countBlock}>
              <CountBlock item={item} type={'cart'} />
            </div>
            <div
              className={
                styles.price +
                ' ' +
                `${
                  item.oldPrice === item.price
                    ? styles.priceWithoutDiscount
                    : ''
                }`
              }
            >
              <div
                className={
                  cartClassName === 'itemsOrder'
                    ? styles.discountPriceOrder
                    : ''
                }
              >
                <DiscountPrice
                  oldPrice={item.price}
                  actualPrice={item.priceWithDiscount}
                />
              </div>
            </div>
          </div>
          {index < items.length - 1 && <Divider />}
        </React.Fragment>
      ))}
      {isOpenMyBouquet && <MyBouquet toggleMyBouquet={toggleMyBouquet} />}
    </div>
  );
};

export default CartItem;
