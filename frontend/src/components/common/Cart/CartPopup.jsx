import React from 'react';

import Divider from '../../ui-kit/components/Divider';
import DiscountPrice from '../../ui-kit/components/DiscountPrice';
import Button from '../../ui-kit/components/Button';
import IconButton from '../../ui-kit/components/IconButton';

import { useWindowSize } from '../../../hooks/useWindowSize';

import styles from './CartPopup.module.scss';
import { ICONS } from '../../ui-kit/icons';

const items = [
  {
    id: 1,
    title: 'Букет “101 троянда”',
    img: './images/bouquet.jpg',
    status: false,
    oldPrice: '2000',
    actualPrice: '1500',
  },
  {
    id: 2,
    title: 'Букет “101 троянда”',
    img: './images/bouquet.jpg',
    status: true,
    oldPrice: '2000',
    actualPrice: '1500',
  },
  {
    id: 3,
    title: 'Свій букет #001”',
    img: './images/bouquet.jpg',
    status: false,
    oldPrice: '1550',
    actualPrice: '1300',
  },
  {
    id: 4,
    title: 'Букет “101 троянда”',
    img: './images/bouquet.jpg',
    status: true,
    oldPrice: '2000',
    actualPrice: '1500',
  },
  {
    id: 5,
    title: 'Свій букет #001”',
    img: './images/bouquet.jpg',
    status: true,
    oldPrice: '1550',
    actualPrice: '1300',
  },
  {
    id: 6,
    title: 'Букет “101 троянда”',
    img: './images/bouquet.jpg',
    status: false,
    oldPrice: '2000',
    actualPrice: '1500',
  },
  {
    id: 7,
    title: 'Букет “101 троянда”',
    img: './images/bouquet.jpg',
    status: false,
    oldPrice: '2000',
    actualPrice: '1500',
  },
  {
    id: 8,
    title: 'Букет “101 троянда”',
    img: './images/bouquet.jpg',
    status: true,
    oldPrice: '2000',
    actualPrice: '1500',
  },
];

const CartPopup = ({ setIsOpen }) => {
  const { width } = useWindowSize();

  const closeCart = () => {
    setIsOpen(false);
  };
  return (
    <div className={styles.overlay} onClick={closeCart}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.container}>
          <div className={styles.headerBlock}>
            <h1 className={styles.title}>Кошик</h1>
            <IconButton
              icon={<ICONS.CloseIcon className={styles.icon} />}
              onClick={closeCart}
            />
          </div>
          {items.length > 0 ? (
            <div className={styles.itemsBlock}>
              {items.map((item, index) => (
                <>
                  <div className={styles.item} key={item.id}>
                    <div className={styles.leftBlock}>
                      <IconButton icon={<ICONS.TrashIcon />} />
                      <div className={styles.blockImg}>
                        <img src={item.img} alt="flower" />
                        <span>{item.title}</span>
                      </div>
                    </div>
                    <div className={styles.rightBlock}>
                      {item.status && (
                        <div className={styles.pencilIcon}>
                          <IconButton
                            icon={<ICONS.PencilIcon />}
                            isBorderYellow={width > 767}
                          />
                        </div>
                      )}
                      <div className={styles.countBlock}>
                        <IconButton icon={<ICONS.dash />} />
                        <div className={styles.field}>2</div>
                        <IconButton
                          icon={<ICONS.addComponent className={styles.icon} />}
                        />
                      </div>
                      <DiscountPrice
                        oldPrice={item.oldPrice}
                        actualPrice={item.actualPrice}
                        isActive="ACTIVE"
                      />
                    </div>
                  </div>
                  {index < items.length - 1 && (
                    <div className={styles.divider}>
                      <Divider />
                    </div>
                  )}
                </>
              ))}
            </div>
          ) : (
            <div>Кошик пустий</div>
          )}
        </div>
        {items.length > 0 && (
          <div className={styles.bottomBlock}>
            <Divider />
            <div className={styles.bottom}>
              <div className={styles.total}>
                Разом:
                <b>
                  2222 <span>грн</span>
                </b>
              </div>
              <Button
                label="Оформити замовлення"
                variant="primary"
                padding="padding-even"
                onClick={closeCart}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPopup;
