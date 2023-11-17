import React from 'react';
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
  const cart = useSelector((state) => state.cartSliceReducer.cartItems);

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
          {cart.length > 0 ? <CartItem items={cart} /> : <CartEmpty />}
        </div>
      </div>
      <div className={styles.bottomBlock}>
        <Divider />
        <div className={styles.bottom}>
          <div className={styles.total}>
            Разом:
            <b>
              <span className={styles.currency}>грн</span>
            </b>
          </div>
          <Button
            label="Оформити замовлення"
            variant={cart.length > 0 ? 'primary' : 'disabled'}
            padding="padding-even"
            onClick={toggleCart}
            disabled={cart.length === 0}
          />
        </div>
      </div>
    </Modals>
  );
};

export default CartPopup;
