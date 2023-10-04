import React from 'react';
import styles from './ContactDetails.module.scss';
import Wrapper from './../../Wrapper';
import { ICONS } from '../../ui-kit/icons';
// import IconButton from '../../ui-kit/components/IconButton/IconButton';

const ContactDetails = () => {
  return (
    <Wrapper>
      <div className={styles.gridTwoBlocks}>
        <div className={styles.menuAccount}>
          <div className={styles.account}>
            <div className={styles.accountIcon}>
              {' '}
              <ICONS.account />
            </div>
            <div className={styles.name}>Шевченко Олена Олегівна</div>
          </div>
          <div className={styles.menuItem}>Мої замовлення</div>
          <div className={styles.menuItem}>Вихід</div>
        </div>
        <div className={styles.contactDetails}>
          <h2> Контактні дані</h2>
          <div className={styles.flexFieldsAndData}>
            <div className={styles.fields}>
              <p>Ім&apos;я</p>
              <p>Прізвище</p>
              <p>По батькові</p>
              <p>Номер телефону</p>
              <p>Ел. пошта</p>
              <p>Дата народження</p>
            </div>
            <div className={styles.data}>
              <p>Олена</p>
              <p>Шевченко</p>
              <p>Олегівна</p>
              <p>+380670000000</p>
              <p>example@gmail.com</p>
              <p>26.03.1992</p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
    // </div>
  );
};
export default ContactDetails;
