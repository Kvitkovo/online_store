import React from 'react';

import Modal from '../../ui-kit/components/Modal';
import Button from '../../ui-kit/components/Button';
import IconButton from '../../ui-kit/components/IconButton';
import Divider from '../../ui-kit/components/Divider';
import MyBouquetItem from './components/MyBouquetItem';
import MyBouquetEmpty from './components/MyBuoquetEmpty';
import { useWindowSize } from '../../../hooks/useWindowSize';

import { ICONS } from '../../ui-kit/icons';
import styles from './MyBouquet.module.scss';

const itemsBouquet = [
  {
    id: 0,
    title: 'Троянда червона',
    img: './images/bouquet.jpg',
    price: 1500,
  },
  {
    id: 1,
    title: 'Троянда червона',
    img: './images/bouquet.jpg',
    price: 1500,
  },
  {
    id: 2,
    title: 'Троянда червона',
    img: './images/bouquet.jpg',
    price: 1300,
  },
  {
    id: 3,
    title: 'Троянда червона',
    img: './images/bouquet.jpg',
    price: 1500,
  },
  {
    id: 4,
    title: 'Троянда червона',
    img: './images/bouquet.jpg',
    price: 1300,
  },
  {
    id: 5,
    title: 'Троянда червона',
    img: './images/bouquet.jpg',
    price: 1500,
  },
];

const MyBouquet = ({ toggleMyBouquet }) => {
  const { width } = useWindowSize();

  const totalSum = itemsBouquet.reduce((sum, obj) => sum + obj.price, 0);

  return (
    <Modal type="myBouquet" onClick={toggleMyBouquet}>
      <div className={styles.container}>
        <div className={styles.headerBlock}>
          {width > 767 ? (
            <p className={styles.title}>Створення власного букету</p>
          ) : (
            <p className={styles.title}>Створення букету</p>
          )}
          <IconButton
            icon={<ICONS.CloseIcon className={styles.icon} />}
            onClick={toggleMyBouquet}
          />
        </div>
        {itemsBouquet.length > 0 ? (
          <MyBouquetItem items={itemsBouquet} count={1} />
        ) : (
          <MyBouquetEmpty />
        )}
      </div>
      <div className={styles.bottomBlock}>
        <div className={styles.reverse}>
          <div className={styles.changeItems}>
            <span className={styles.deleteAll}>Видалити все</span>
            <Button
              label={width > 767 ? 'Додати компонент' : 'Додати'}
              variant="secondary"
              padding="padding-sm"
              icon={<ICONS.addComponent />}
            />
          </div>
          <Divider />
        </div>
        <div className={styles.bottom}>
          <div className={styles.total}>
            Разом:
            <b>99</b>
            <span>шт</span>
            <b className={styles.sum}>{totalSum}</b>
            <span>грн</span>
          </div>
          <Button
            label="Зібрати букет"
            variant={itemsBouquet.length > 0 ? 'primary' : 'disabled'}
            padding="padding-even"
            onClick={toggleMyBouquet}
            disabled={itemsBouquet.length === 0}
          />
        </div>
      </div>
    </Modal>
  );
};

export default MyBouquet;
