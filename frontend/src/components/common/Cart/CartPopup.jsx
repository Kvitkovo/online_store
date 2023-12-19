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
import { useNavigate } from 'react-router-dom';

const CartPopup = ({ toggleCart }) => {
  const cartItems = useSelector((state) => state.cartSliceReducer.cartItems);
  const navigate = useNavigate();

  const productTotal = useMemo(() => {
    const total = cartItems.reduce(
      (accumulator, element) =>
        accumulator + element.cardQuantity * element.price,
      0,
    );
    return total;
  }, [cartItems]);

  const handleOrder = () => {
    navigate('/order');
    toggleCart();
  };

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
            <CartItem items={cartItems} cartClassName="itemsCart" />
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
            onClick={() => handleOrder()}
            disabled={cartItems.length === 0}
          />
        </div>
      </div>
    </Modals>
  );
};

export default CartPopup;
