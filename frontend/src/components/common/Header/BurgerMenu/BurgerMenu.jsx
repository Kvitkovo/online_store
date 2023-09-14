import React, { useState } from 'react';
import styles from './BurgerMenu.module.scss';
import Button from '../../../ui-kit/components/Button';
import { ICONS } from '../../../ui-kit/icons';
import Divider from '../../../ui-kit/components/Divider';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen ? (
        <div className={styles.menuItems}>
          <div className={styles.logoContainer}>
            <img className={styles.logo} src="images/logo.svg" />
            <ICONS.closeMobile />
          </div>
          <div className={styles.container}>
            <ul>
              <li className={`${styles.links} ${styles.catalogue}`}>
                {' '}
                <ICONS.mobileCatalogue />
                <span>Каталог товарів</span>
              </li>
              <div className={styles.navigation}>
                <li className={`${styles.links} ${styles.promotions}`}>
                  Акції
                </li>
                <li className={styles.links}>Про нас</li>
                <li className={styles.links}>Доставка та оплата</li>
                <li className={styles.links}>Догляд за квітами</li>
              </div>
            </ul>
            <div className={styles.divider}>
              <Divider />
            </div>
            <a className={styles.phoneLink} href="tel:+380937777777">
              <Button
                variant="no-border"
                label="(093) 777-77-77"
                padding="padding-header-even"
                reverse="true"
                icon={<ICONS.phone />}
              />
            </a>
            <div className={styles.location}>
              <Button
                variant="no-border"
                label="Київ"
                padding="padding-header-even"
                reverse="true"
                icon={<ICONS.location />}
              />
            </div>
            <div className={styles.accesibility}>
              <Button
                variant="no-border"
                label="Спеціальні можливості"
                padding="padding-header-even"
                reverse="true"
                icon={<ICONS.person />}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.burgerMenu}>
          <div className={styles.burgerHeader}>
            <div className={styles.burgerIcon} onClick={toggleMenu}>
              <ICONS.burgerMenu />
            </div>
            <div className={styles.actionIcons}>
              <div className={styles.search}>
                <ICONS.searchMobile />
              </div>
              <div className={styles.bouquet}>
                <ICONS.BouquetIcon />
              </div>
              <div className={styles.account}>
                <ICONS.halfPerson />
              </div>
              <div className={styles.cart}>
                <ICONS.CartIcon />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BurgerMenu;
