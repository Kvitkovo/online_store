import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './OrderInfo.module.scss';
import { useSelector } from 'react-redux';
import CartItem from '../../../common/Cart/components/CartItem';
import Divider from '../../../ui-kit/components/Divider';
import Button from '../../../ui-kit/components/Button';

const OrderInfo = () => {
  const cartItems = useSelector((state) => state.cartSliceReducer.cartItems);

  const productTotal = useMemo(() => {
    const total = cartItems.reduce(
      (accumulator, element) =>
        accumulator + element.cardQuantity * element.price,
      0,
    );
    return total;
  }, [cartItems]);
  return (
    <div className={styles.cart}>
      <h3 className={styles.subtitle}>Інформація про замовлення</h3>
      <p>У вашому кошику: товари(ів):</p>
      <Divider />
      <CartItem items={cartItems} />
      <Divider />
      <div className={styles.flex}>
        <div>
          <p>Сума замовлення:</p>
          <p>Доставка:</p>
          <p>Сума до сплати:</p>
        </div>
        <div>
          <p>{productTotal}</p>
          <p>Безкоштовно</p>
          <p>{productTotal}</p>
        </div>
      </div>
      <Link to="/">Продовжити покупки</Link>
      <Button label="Оформити замовлення"></Button>
    </div>
  );
};

export default OrderInfo;
