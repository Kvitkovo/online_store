import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modals from '../Modals';
import CartItem from './components/CartItem';
import CartEmpty from './components/CartEmpty';
import Divider from '../../ui-kit/components/Divider';
import Button from '../../ui-kit/components/Button';
import IconButton from '../../ui-kit/components/IconButton';

import styles from './CartPopup.module.scss';
import { ICONS } from '../../ui-kit/icons';
import { useNavigate } from 'react-router-dom';
import { clearCart, removeFromCart } from '../../../redux/slices/cartSlice';
import Footer from '../../Footer';
import { useWindowSize } from '../../../hooks/useWindowSize';

const CartPopup = ({ toggleCart, toggleMyBouquet, getBouquetData }) => {
  const cartItems = useSelector((state) => state.cartSliceReducer.cartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { width } = useWindowSize();

  const productTotal = useMemo(() => {
    const total = cartItems.reduce(
      (accumulator, element) =>
        accumulator + element.cardQuantity * element.priceWithDiscount,
      0,
    );
    return total;
  }, [cartItems]);
  const editBouquet = useCallback(
    (item) => {
      dispatch(clearCart({ type: 'bouquet' }));
      localStorage.setItem(
        'bouquet',
        JSON.stringify(item.orderItemsCompositions),
      );
      getBouquetData('bouquet');
      dispatch(removeFromCart({ info: item, type: 'cart' }));
      toggleCart();
      toggleMyBouquet();
    },
    [dispatch, getBouquetData, toggleCart, toggleMyBouquet],
  );
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
        {cartItems.length > 0 ? (
          <CartItem
            items={cartItems}
            cartClassName="itemsCart"
            editBouquet={editBouquet}
          />
        ) : (
          <CartEmpty />
        )}
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
      </div>
      {width < 868 && <Footer />}
    </Modals>
  );
};

export default CartPopup;
