import React from 'react';
import { NavLink } from 'react-router-dom';
import ROUTES from '../constants/routers';
import styles from './Footer.module.scss';
import IconButton from '../ui-kit/components/IconButton';
import { ICONS } from '../ui-kit/icons';

const kvitkovoLinks = [
  { route: ROUTES.about, text: 'Про нас' },
  { route: ROUTES.contacts, text: 'Контакти' },
  { route: ROUTES.partner, text: 'Стати партнером' },
  { route: ROUTES.privacy, text: 'Політика конфіденційності' },
];

const clientLinks = [
  { route: ROUTES.orderStatus, text: 'Статус замовлення' },
  { route: ROUTES.delivery, text: 'Доставка та оплата' },
  { route: ROUTES.about, text: 'Акції в Kvitkovo' },
  { route: ROUTES.care, text: 'Догляд за квітами' },
  { route: ROUTES.faq, text: 'Поширені запитання' },
];

const Footer = () => {
  return (
    <footer>
      <div className={styles.container}>
        <section>
          <h3 className={styles.title}>Kvitkovo</h3>
          <ul>
            {kvitkovoLinks.map((link, index) => (
              <li key={index}>
                <NavLink className={styles.links} to={link.route}>
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className={styles.title}>Клієнтам</h3>
          <ul>
            {clientLinks.map((link, index) => (
              <li key={index}>
                <NavLink className={styles.links} to={link.route}>
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className={styles.title}>Номер телефону</h3>
          <p>+38 (093) 777-77-77 </p>

          <h3 className={styles.title}>Адреса</h3>
          <address>м. Київ, вул. Івана Мазепи 11</address>
        </section>
        <section>
          <h3 className={styles.title}>Соц. мережі</h3>
          <div className={styles.img}>
            <IconButton icon={<ICONS.facebook />} />
            <IconButton icon={<ICONS.instagram />} />
            <IconButton icon={<ICONS.youtube />} />
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
