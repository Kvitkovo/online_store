import React, { useState } from 'react';
import { ICONS } from '../../ui-kit/icons';
import styles from './Catalog.module.scss';
import mockCategories from '../../../data/catalog/catalogMockData.json';
import {
  mockContacts,
  mockCategories as mockData,
} from '../../../data/catalog/contatct';
import { useNavigate } from 'react-router-dom';

const Catalog = ({ setIsOpen }) => {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);

  const arrIcon = mockData.map((category) => category.icon);
  const arrBg = mockData.map((category) => category.bg);
  const formatedCategories = mockCategories
    .filter((category) => !category.parent)
    .map((category, index) => {
      const mainPath = `/catalog/${category.alias.toLocaleLowerCase()}`;
      return {
        ...category,
        children: mockCategories
          .filter((child) => child.parent?.id === category.id)
          .map((child) => ({
            ...child,
            link: `${mainPath}/${child.alias.toLocaleLowerCase()}`,
          })),
        icon: arrIcon[index] || <ICONS.bukety_z_kvitiv />,
        bg: arrBg[index],
        link: mainPath,
      };
    });

  const redirectHandler = (link) => {
    navigate(link);
    setIsOpen(false);
  };

  return (
    <div className={styles.categoryWrapper}>
      <div className={styles.itemsWrapper}>
        <ul className={styles.categoryList}>
          {formatedCategories.map((category) => {
            const isHasChildren = !!category?.children?.length;
            return (
              <li
                key={category.id}
                className={styles.categoryItemWrapper}
                onMouseOver={() =>
                  setHoveredItem({
                    subCategories: category.children,
                    bg: category.bg,
                    name: category.name,
                  })
                }
              >
                <a
                  onClick={() => redirectHandler(category.link)}
                  className={styles.categoryLink}
                >
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
            {mockContacts.map((contact) => {
              return (
                <li key={contact.id} className={styles.categoryItemWrapper}>
                  <a className={styles.categoryLink}>
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
              <li key={child.id} className={styles.categoryItemWrapper}>
                <a
                  onClick={() => redirectHandler(child.link)}
                  className={styles.categoryLink}
                >
                  {child.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <img
        src={hoveredItem?.bg || mockData[0].bg}
        alt={hoveredItem?.name || mockData[0].name}
        className={styles.categoryBg}
      />
    </div>
  );
};
export default Catalog;
