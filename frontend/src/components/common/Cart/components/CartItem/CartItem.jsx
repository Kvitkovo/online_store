import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowSize } from '../../../../../hooks/useWindowSize';
import DiscountPrice from '../../../../ui-kit/components/DiscountPrice';
import Divider from '../../../../ui-kit/components/Divider';
import IconButton from '../../../../ui-kit/components/IconButton';
import CountBlock from '../CountBlock';

import styles from './CartItem.module.scss';
import { ICONS } from '../../../../ui-kit/icons';
import { removeFromCart } from '../../../../../redux/slices/cartSlice';
import ConfirmationPopup from '../../../MyBouquet/components/ConfirmationPopup';

const CartItem = ({ items, cartClassName, editBouquet }) => {
  const dispatch = useDispatch();
  const { bouquetItems } = useSelector((state) => state.cartSliceReducer);
  const { width } = useWindowSize();
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart({ info: cartItem, type: 'cart' }));
  };

  const handleEditing = useCallback(
    (item) => {
      setConfirmationOpen(false);
      editBouquet(item);
    },
    [editBouquet],
  );

  const handleSetConfirmation = useCallback(
    (item) => {
      if (bouquetItems.length > 0) {
        setConfirmationOpen(true);
      } else {
        editBouquet(item);
      }
    },
    [bouquetItems.length, editBouquet],
  );

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
                    onClick={() => handleSetConfirmation(item)}
                  />
                  {isConfirmationOpen && (
                    <ConfirmationPopup
                      setIsOpen={setConfirmationOpen}
                      confirmedAction={() => handleEditing(item)}
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
                {/* {console.log(item)} */}
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
    </div>
  );
};

export default CartItem;
