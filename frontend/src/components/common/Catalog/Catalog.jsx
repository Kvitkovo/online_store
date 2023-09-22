/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { ICONS } from '../../ui-kit/icons';
import styles from './Catalog.module.scss';
import mockCategories from '../../../data/catalogMockData.json';

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

  const contacts = [
    {
      id: 97,
      name: '(093) 777-77-77',
      bg: './images/catalog-images/background/akciyna_cena.png',
      icon: <ICONS.akciyna_cena />,
      hasSubCategory: false,
    },
    {
      id: 98,
      name: 'Київ',
      bg: './images/catalog-images/background/akciyna_cena.png',
      icon: <ICONS.akciyna_cena />,
      hasSubCategory: false,
    },
  ];

  const arrIcon = categories.map((category) => category.icon);
  const arrBg = categories.map((category) => category.bg);

  const [hoveredItem, setHoveredItem] = useState(null);

  const formatedCategories = mockCategories
    .filter((category) => !category.parent)
    .map((category, index) => ({
      ...category,
      children: mockCategories.filter(
        (child) => child.parent?.id === category.id,
      ),
      icon: arrIcon[index] || <ICONS.bukety_z_kvitiv />,
      bg: arrBg[index],
    }));

  return (
    <div className={styles.categoryWrapper}>
      <div className={styles.itemsWrapper}>
        <ul className={styles.categoryList}>
          {formatedCategories.map((category) => {
            const isHasChildren = !!category?.children?.length;
            return (
              <li
                key={category.id}
                className={styles.categoryItem}
                onMouseOver={() =>
                  setHoveredItem({
                    subCategories: category.children,
                    bg: category.bg,
                    name: category.name,
                  })
                }
              >
                <a href="#">
                  <span className={styles.categoryIcon}>{category.icon}</span>
                  <div className={styles.categoryItemContent}>
                    <span className={styles.categoryItemText}>
                      {category.name}
                    </span>
                    {isHasChildren && <ICONS.ArrowRightIcon />}
                  </div>
                </a>
              </li>
            );
          })}
          <div className={styles.contacts}>
            {contacts.map((contact) => {
              return (
                <li key={contact.id} className={styles.categoryItem}>
                  <a href="#">
                    <span className={styles.categoryIcon}>{contact.icon}</span>
                    <div className={styles.categoryItemContent}>
                      <span className={styles.categoryItemText}>
                        {contact.name}
                      </span>
                    </div>
                  </a>
                </li>
              );
            })}
          </div>
        </ul>
        {!!hoveredItem?.subCategories?.length && (
          <ul className={styles.subCategoryList}>
            {hoveredItem.subCategories.map((child) => (
              <li key={child.id} className={styles.categoryItem}>
                <a href="#">{child.name}</a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <img
        src={hoveredItem?.bg || categories[0].bg}
        alt={hoveredItem?.name || categories[0].name}
        className={styles.categoryBg}
      />
    </div>
  );
};
export default Catalog;
