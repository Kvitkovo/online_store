import React from 'react';

import Modals from '../Modals';
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

  const hasItems = itemsBouquet.length > 0;

  return (
    <Modals type="myBouquet" onClick={toggleMyBouquet}>
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
        {hasItems ? (
          <MyBouquetItem items={itemsBouquet} count={1} />
        ) : (
          <MyBouquetEmpty />
        )}
      </div>
      <div className={styles.bottomBlock}>
        <div className={hasItems ? styles.reverse : ''}>
          <div className={styles.changeItems}>
            <span
              className={hasItems ? styles.deleteAll : styles.noActiveDelete}
            >
              Видалити все
            </span>
            <Button
              label={width > 767 ? 'Додати компонент' : 'Додати'}
              variant="secondary"
              padding="padding-sm"
              icon={<ICONS.addComponent />}
            />
          </div>
          <div className={hasItems || styles.divider}>
            <Divider />
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.total}>
            <p>Разом:</p>
            <div>
              <b>99</b>
              <span>шт</span>
              <b className={styles.sum}>{totalSum}</b>
              <span>грн</span>
            </div>
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
    </Modals>
  );
};

export default MyBouquet;
