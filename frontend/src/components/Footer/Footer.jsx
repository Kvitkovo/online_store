import React from 'react';
import LinksList from './components/LinksList';
import { clientLinks, kvitkovoLinks, socialsLinks } from './navigationLinks';

import styles from './Footer.module.scss';
import IconButton from '../ui-kit/components/IconButton';

const Footer = () => {
  return (
    <footer>
      <div className={styles.container}>
        <LinksList title="Kvitkovo" links={kvitkovoLinks} />
        <LinksList title="Клієнтам" links={clientLinks} />
        <div className={styles.blockRight}>
          <section className={styles.contacts}>
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
