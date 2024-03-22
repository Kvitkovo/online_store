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
  let receiverName = '';
  let receiverPhone = '';

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

  const sendOrder = async () => {
    const orderItems = cartItems.map((item) => {
      if (item.orderItemsCompositions) {
        const bouquetItems = item.orderItemsCompositions.map(
          (compositionItem) => {
            return {
              productId: compositionItem.id,
              qty: compositionItem.cardQuantity,
            };
          },
        );
        return {
          productTitle: item.title,
          price: item.price,
          qty: item.cardQuantity,
          orderItemsCompositions: bouquetItems,
        };
      } else
        return {
          productId: item.id,
          productTitle: item.title,
          price: item.price,
          qty: item.cardQuantity,
        };
    });

    if (orderData.contactData.recipient === 'I') {
      receiverName = orderData.contactData.clientFirstName;
      receiverPhone = orderData.contactData.clientPhone;
    } else {
      receiverName =
        orderData.contactData.recipientLastName +
        ' ' +
        orderData.contactData.recipientFirstName +
        ' ' +
        orderData.contactData.recipientMiddleName;
      receiverPhone = orderData.contactData.recipientPhone;
    }

    const {
      postcardText,
      contactData: { clientFirstName, clientPhone, clientEmail },
      deliveryData: { clientStreet, clientHouse, clientFlat, delivery },
      paymentData: { payment },
    } = orderData;

    const formattedPhone = (phoneNumber) => phoneNumber.replace(/[\s()]/g, '');

    const result = await addOrderToDB({
      postcardText,
      customerName: clientFirstName,
      customerPhone: formattedPhone(clientPhone),
      customerEmail: clientEmail,
      addressStreet: clientStreet,
      addressHous: clientHouse,
      addressApartment: clientFlat,
      receiverName,
      receiverPhone: formattedPhone(receiverPhone),
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
