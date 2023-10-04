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
          <h1> Контактні дані</h1>
        </div>
      </div>
    </Wrapper>
    // </div>
  );
};
export default ContactDetails;
