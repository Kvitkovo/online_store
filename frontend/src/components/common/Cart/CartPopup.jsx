import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Modals from '../Modals';
import CartItem from './components/CartItem';
import CartEmpty from './components/CartEmpty';
import Divider from '../../ui-kit/components/Divider';
import Button from '../../ui-kit/components/Button';
import IconButton from '../../ui-kit/components/IconButton';

import styles from './CartPopup.module.scss';
import { ICONS } from '../../ui-kit/icons';

const CartPopup = ({ toggleCart }) => {
  const cartItems = useSelector((state) => state.cartSliceReducer.cartItems);

  const productTotal = useMemo(() => {
    let total = 0;
    cartItems.forEach((element) => {
      total += element.cardQuantity * element.price;
    });
    return total;
  }, [cartItems]);

  return (
    <Modals type="cart" onClick={toggleCart}>
      <div className={styles.container}>
        <div className={styles.headerBlock}>
          <p className={styles.title}>Кошик</p>
          <IconButton
            icon={<ICONS.CloseIcon className={styles.icon} />}
            onClick={toggleCart}
          />
        </div>
        <div className={styles.mobileBackground}>
          {cartItems.length > 0 ? (
            <CartItem items={cartItems} />
          ) : (
            <CartEmpty />
          )}
        </div>
      </div>
      <div className={styles.bottomBlock}>
        <Divider />
        <div className={styles.bottom}>
          <div className={styles.total}>
            Разом:
            <b>
              {productTotal}
              <span className={styles.currency}>грн</span>
            </b>
          </div>
          <Button
            label="Оформити замовлення"
            variant={cartItems.length > 0 ? 'primary' : 'disabled'}
            padding="padding-even"
            onClick={toggleCart}
            disabled={cartItems.length === 0}
          />
        </div>
      </div>
    </Modals>
  );
};

export default CartPopup;
