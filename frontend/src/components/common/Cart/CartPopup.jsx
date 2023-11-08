import React from 'react';

import Modals from '../Modals';
import CartItem from './components/CartItem';
import CartEmpty from './components/CartEmpty';
import Divider from '../../ui-kit/components/Divider';
import Button from '../../ui-kit/components/Button';
import IconButton from '../../ui-kit/components/IconButton';

import styles from './CartPopup.module.scss';
import { ICONS } from '../../ui-kit/icons';

const items = [
  {
    id: 0,
    title: 'Букет “101 троянда”',
    img: './images/bouquet.jpg',
    status: false,
    oldPrice: 2000,
    actualPrice: 1500,
  },
  {
    id: 1,
    title: 'Букет “101 троянда”',
    img: './images/bouquet.jpg',
    status: true,
    oldPrice: 2000,
    actualPrice: 1500,
  },
  {
    id: 2,
    title: 'Свій букет #001”',
    img: './images/bouquet.jpg',
    status: false,
    oldPrice: 1550,
    actualPrice: 1300,
  },
  {
    id: 3,
    title: 'Букет “101 троянда”',
    img: './images/bouquet.jpg',
    status: true,
    oldPrice: 2000,
    actualPrice: 1500,
  },
  {
    id: 4,
    title: 'Свій букет #001”',
    img: './images/bouquet.jpg',
    status: true,
    oldPrice: 1550,
    actualPrice: 1300,
  },
  {
    id: 5,
    title: 'Букет “101 троянда”',
    img: './images/bouquet.jpg',
    status: false,
    oldPrice: 2000,
    actualPrice: 1500,
  },
];

const CartPopup = ({ toggleCart }) => {
  const totalSum = items.reduce((sum, obj) => sum + obj.actualPrice, 0);

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
        {items.length > 0 ? (
          <CartItem items={items} count={1} />
        ) : (
          <CartEmpty />
        )}
      </div>
      <div className={styles.bottomBlock}>
        <Divider />
        <div className={styles.bottom}>
          <div className={styles.total}>
            Разом:
            <b>
              {totalSum}
              <span className={styles.currency}>грн</span>
            </b>
          </div>
          <Button
            label="Оформити замовлення"
            variant={items.length > 0 ? 'primary' : 'disabled'}
            padding="padding-even"
            onClick={toggleCart}
            disabled={items.length === 0}
          />
        </div>
      </div>
    </Modals>
  );
};

export default CartPopup;
