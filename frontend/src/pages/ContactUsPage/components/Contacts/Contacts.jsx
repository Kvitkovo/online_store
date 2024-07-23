import React from 'react';

import { mockContacts } from '../../../../data/catalog';

import styles from './Contacts.module.scss';

const Contacts = ({ href }) => {
  return (
    <>
      <div className={styles.contacts}>
        <div className={styles.contactsAddress}>
          <h2 className={styles.contactsTitle}>Адреса:</h2>
          <p className={styles.contactsAddressText}>
            м. Київ, вул. Івана Мазепи 11
          </p>
          <p className={styles.contactsAddressSchedule}>
            <span>пн-нд</span>
            <span>10:00 - 20:00</span>
          </p>
        </div>
        <div className={styles.contactsContact}>
          <h2 className={styles.contactsTitle}>Телефон та пошта:</h2>
          <div className={styles.contactsContactBox}>
            {mockContacts.map((contact) => (
              <a key={contact.href} href={contact.href}>
                {contact.text}
              </a>
            ))}
          </div>
        </div>
        <div className={styles.contactsRouteLaying}>
          <a
            href={href}
            target="_blank"
            className={styles.routeLink}
            rel="noopener noreferrer"
          >
            Прокласти маршрут
          </a>
        </div>
      </div>
      <div className={styles.routeLaying}>
        <a
          href={href}
          className={styles.routeLink}
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
