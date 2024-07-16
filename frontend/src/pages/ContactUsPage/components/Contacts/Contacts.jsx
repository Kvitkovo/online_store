import React from 'react';

import { mockContacts } from '../../../../data/catalog';

import styles from './Contacts.module.scss';

const Contacts = ({ href }) => {
  return (
    <>
      <div className={styles.contacts}>
        <div className={styles['contacts-address']}>
          <h2 className={styles['contacts-title']}>Адреса:</h2>
          <p className={styles['contacts-address-text']}>
            м. Київ, вул. Івана Мазепи 11
          </p>
          <p className={styles['contacts-address-schedule']}>
            <span>пн-нд</span>
            <span>10:00 - 20:00</span>
          </p>
        </div>
        <div className={styles['contacts-contact']}>
          <h2 className={styles['contacts-title']}>Телефон та пошта:</h2>
          <div className={styles['contacts-contact-box']}>
            {mockContacts.map((contact) => (
              <a key={contact.href} href={contact.href}>
                {contact.text}
              </a>
            ))}
          </div>
        </div>
        <div className={styles['contacts-routeLaying']}>
          <a
            href={href}
            target="_blank"
            className={styles['route-link']}
            rel="noopener noreferrer"
          >
            Прокласти маршрут
          </a>
        </div>
      </div>
      <div className={styles.routeLaying}>
        <a
          href={href}
          className={styles['route-link']}
          target="_blank"
          rel="noopener noreferrer"
        >
          Прокласти маршрут
        </a>
      </div>
    </>
  );
};

export default Contacts;
