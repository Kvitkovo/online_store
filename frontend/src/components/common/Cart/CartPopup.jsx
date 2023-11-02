import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modals from '../Modals';
import CartItem from './components/CartItem';
import CartEmpty from './components/CartEmpty';
import Divider from '../../ui-kit/components/Divider';
import Button from '../../ui-kit/components/Button';
import IconButton from '../../ui-kit/components/IconButton';

import styles from './CartPopup.module.scss';
import { ICONS } from '../../ui-kit/icons';
import { calculateTotal } from '../../../redux/slices/cartSlice';

const CartPopup = ({ toggleCart }) => {
  const cart = useSelector((state) => state.cartSliceReducer.cartItems);
  const total = useSelector((state) => state.cartSliceReducer.cartTotalAmount);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotal());
  });

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
        {cart.length > 0 ? <CartItem items={cart} /> : <CartEmpty />}
      </div>
      <div className={styles.bottomBlock}>
        <Divider />
        <div className={styles.bottom}>
          <div className={styles.total}>
            Разом:
            <b>
              {total}
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
