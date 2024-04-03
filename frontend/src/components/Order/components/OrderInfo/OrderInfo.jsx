import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './OrderInfo.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../../../common/Cart/components/CartItem';
import Divider from '../../../ui-kit/components/Divider';
import Button from '../../../ui-kit/components/Button';
import { addOrderToDB } from '../../../../services/order';
import { clearCart } from '../../../../redux/slices/cartSlice';

const OrderInfo = ({ orderData }) => {
  const cartItems = useSelector((state) => state.cartSliceReducer.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productTotal = useMemo(() => {
    const total = cartItems.reduce(
      (accumulator, element) =>
        accumulator + element.cardQuantity * element.priceWithDiscount,
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

  const formattedPhone = (phoneNumber) => phoneNumber.replace(/[\s()]/g, '');

  const getReceiverInfo = () => {
    let receiverName = '';
    let receiverPhone = '';
    let {
      recipient,
      clientFirstName,
      clientPhone,
      recipientFirstName,
      recipientLastName,
      recipientMiddleName,
      recipientPhone,
    } = orderData;

    if (recipient === 'I') {
      receiverName = clientFirstName;
      receiverPhone = formattedPhone(clientPhone);
    } else {
      receiverName =
        recipientLastName +
        ' ' +
        recipientFirstName +
        ' ' +
        recipientMiddleName;
      receiverPhone = formattedPhone(recipientPhone);
    }

    return { receiverName, receiverPhone };
  };

  const getOrderItems = () => {
    return cartItems.map((item) => {
      const orderItem = {
        productId: item.id,
        productTitle: item.title,
        price: item.price,
        qty: item.cardQuantity,
      };
      if (item.orderItemsCompositions) {
        orderItem.orderItemsCompositions = item.orderItemsCompositions.map(
          (compositionItem) => ({
            productId: compositionItem.id,
            qty: compositionItem.cardQuantity,
          }),
        );
      }
      return orderItem;
    });
  };

  const sendOrder = async () => {
    const { receiverName, receiverPhone } = getReceiverInfo();
    const orderItems = getOrderItems();
    const {
      postcardText,
      contactData: { clientFirstName, clientPhone, clientEmail },
      deliveryData: { clientStreet, clientHouse, clientFlat, delivery },
      paymentData: { payment },
    } = orderData;

    const result = await addOrderToDB({
      postcardText,
      customerName: clientFirstName,
      customerPhone: formattedPhone(clientPhone),
      customerEmail: clientEmail,
      addressStreet: clientStreet,
      addressHous: clientHouse,
      addressApartment: clientFlat,
      receiverName,
      receiverPhone,
      delivery,
      pay: payment,
      shopId: 1,
      orderItems,
    });

    if (result) {
      dispatch(clearCart({ type: 'cart' }));
      navigate(`/order/${result}`);
    }
  };

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
            onClick={() => sendOrder()}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
