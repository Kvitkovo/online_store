/* eslint-disable no-unused-vars */
import React from 'react';
import { ICONS } from '../../ui-kit/icons';
import styles from './Catalog.module.scss';

const Catalog = (props) => {
  const categories = [
    {
      id: 1,
      name: 'Акційна ціна',
      bg: './images/catalog-images/background/akciyna_cena.png',
      icon: <ICONS.akciyna_cena />,
      hasSubCategory: false,
    },
    {
      id: 2,
      name: 'Букети з квітів',
      bg: './images/catalog-images/background/bukety_z_kvitiv.png',
      icon: <ICONS.bukety_z_kvitiv />,
      hasSubCategory: true,
    },
    {
      id: 3,
      name: 'Квіти поштучно',
      bg: './images/catalog-images/background/kvity_po_shtuchno.png',
      icon: <ICONS.kvity_po_shtuchno />,
      hasSubCategory: true,
    },
    {
      id: 4,
      name: 'Весільні букети',
      bg: './images/catalog-images/background/vesilni.png',
      icon: <ICONS.vesilni />,
      hasSubCategory: true,
    },
    {
      id: 5,
      name: 'Квіти у кошику',
      bg: './images/catalog-images/background/kvity_u_koshyku.png',
      icon: <ICONS.kvity_u_koshyku />,
      hasSubCategory: false,
    },
    {
      id: 6,
      name: 'Кімнатні квіти',
      bg: './images/catalog-images/background/hatni.png',
      icon: <ICONS.hatni />,
      hasSubCategory: false,
    },
    {
      id: 7,
      name: 'Декор із квітів',
      bg: './images/catalog-images/background/dekor.png',
      icon: <ICONS.dekor />,
      hasSubCategory: false,
    },
  ];
  return (
    <div className={styles.categoryWrapper}>
      <ul className={styles.categoryList}>
        {categories.map((category) => {
          return (
            <li key={category.id} className={styles.categoryItem}>
              <a href="#">
                {category.icon}
                <span>{category.name}</span>
              </a>
            </li>
          );
        })}
      </ul>
      <img
        src={categories[0].bg}
        alt={categories[0].name}
        className={styles.categoryBg}
      />
    </div>
  );
};
export default Catalog;
