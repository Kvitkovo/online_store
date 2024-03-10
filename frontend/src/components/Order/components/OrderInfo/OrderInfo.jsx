import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './OrderInfo.module.scss';
import { useSelector } from 'react-redux';
import CartItem from '../../../common/Cart/components/CartItem';
import Divider from '../../../ui-kit/components/Divider';
import Button from '../../../ui-kit/components/Button';

const OrderInfo = ({ orderData }) => {
  const cartItems = useSelector((state) => state.cartSliceReducer.cartItems);

  const productTotal = useMemo(() => {
    const total = cartItems.reduce(
      (accumulator, element) =>
        accumulator + element.cardQuantity * element.price,
      0,
    );
    return total;
  }, [cartItems]);

  const productQuantity = useMemo(() => {
    const quantity = cartItems.reduce(
      (accumulator, item) => accumulator + item.cardQuantity,
      0,
    );
    return quantity;
  }, [cartItems]);

  // const sendOrder = () => {
  //   console.log(cartItems, orderData);
  // };

  return (
    <div className={styles.cart}>
      <div className={styles.topPart}>
        <h3 className={styles.subtitle}>Інформація про замовлення</h3>
        <p className={styles.itemsQuantity}>
          У вашому кошику товарів: {productQuantity}
        </p>
      </div>

      <Divider />
      <CartItem items={cartItems} cartClassName="itemsOrder" />
      <Divider />
      <div className={styles.bottomPart}>
        <div className={styles.flex}>
          <div>
            <p>Сума замовлення:</p>
            <p>Доставка:</p>
            <p>Сума до сплати:</p>
          </div>
          <div>
            <p>{productTotal} грн</p>
            <p>Безкоштовно</p>
            <p>{productTotal} грн</p>
          </div>
        </div>
        <Link className={styles.link} to="/">
          Продовжити покупки
        </Link>
        <div className={styles.orderButton}>
          <Button
            label="Оформити замовлення"
            padding="padding-even"
            variant={orderData.paymentData ? 'primary' : 'disabled'}
            disabled={orderData.paymentData ? false : true}
            // onClick={() => sendOrder()}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
