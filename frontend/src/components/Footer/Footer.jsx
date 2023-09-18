import React from 'react';
import ROUTES from '../constants/routers';
import styles from './Footer.module.scss';
import IconButton from '../ui-kit/components/IconButton';
import { ICONS } from '../ui-kit/icons';
import LinksList from '../LinksList';

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

const socialsLinks = [
  { icon: <ICONS.facebook />, url: 'https://uk-ua.facebook.com/' },
  { icon: <ICONS.instagram />, url: 'https://www.instagram.com/' },
  { icon: <ICONS.youtube />, url: 'https://www.youtube.com/' },
];

const Footer = () => {
  return (
    <footer>
      <div className={styles.container}>
        <LinksList title="Kvitkovo" links={kvitkovoLinks} />
        <LinksList title="Клієнтам" links={clientLinks} />
        <div className={styles.blockRight}>
          <section>
            <h3 className={styles.title}>Номер телефону</h3>
            <p>+38 (093) 777-77-77 </p>

            <h3 className={styles.title}>Адреса</h3>
            <address>м. Київ, вул. Івана Мазепи 11</address>
          </section>
          <section className={styles.socials}>
            <h3 className={styles.title}>Соц. мережі</h3>
            <div className={styles.iconsBlock}>
              {socialsLinks.map((link) => (
                <a
                  key={link.url}
                  rel="noreferrer"
                  target="_blank"
                  href={link.url}
                >
                  <IconButton icon={link.icon} />
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
