import React from 'react';

import { useScroll } from '../../hooks';
import Path from '../CardPage/components';

import { GoogleMap, Contacts } from './components';
import styles from './ContactUsPage.module.scss';

const googleMapsLink =
  'https://www.google.com/maps/dir/?api=1' +
  `&destination=${encodeURIComponent('вул. Мазепи, 11, Київ, Україна')}`;

const ContactUs = () => {
  useScroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
    scrollOnMount: true,
  });

  return (
    <>
      <Path
        currentPageData={{ name: 'Контакти' }}
        currentPageType={'section'}
      />
      <section className={styles.contactSection}>
        <h1 className={styles.sectionTitle}>Contact us</h1>
        <GoogleMap href={googleMapsLink} />
        <Contacts href={googleMapsLink} />
      </section>
    </>
  );
};

export default ContactUs;
