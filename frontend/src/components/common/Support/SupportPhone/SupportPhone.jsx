import React from 'react';
import styles from './SupportPhone.module.scss';
import Modals from '../../Modals';
import IconButton from '../../../ui-kit/components/IconButton';
import { ICONS } from '../../../ui-kit/icons';
import Button from '../../../ui-kit/components/Button';

const SupportPhone = ({ toggleSupportPhone }) => {
  return (
    <Modals type="support" onClick={toggleSupportPhone}>
      <div className={styles.header}>
        <div className={styles.headerContent}> Підтримка</div>
        <div className={styles.iconContainer}>
          <IconButton
            onClick={toggleSupportPhone}
            icon={<ICONS.closeMobile />}
          />
        </div>
      </div>

      <div className={styles.formContainer}>
        <form className={styles.supportForm}>
          <p className={styles.callback}>Бажаєте, ми вам передзвонимо?</p>
          <p className={styles.enterData}>
            Введіть номер телефону та ім’я, і ми зв’яжемося з вами.
          </p>

          <div className={styles.dataContainer}>
            <label className={styles.labelData} htmlFor="name">
              Ваше ім’я
            </label>
            <br />
            <input
              className={styles.dataInput}
              type="text"
              placeholder="Як до вас звертатись?"
            />
          </div>

          <div className={styles.dataContainer}>
            <label className={styles.labelData} htmlFor="phone">
              Номер телефону
            </label>
            <br />
            <input
              className={styles.dataInput}
              type="phone"
              placeholder="+38(0XX)XXX-XX-XX"
            />
          </div>

          <div className={styles.commentContainer}>
            <label className={styles.labelData} htmlFor="message">
              Коментар
            </label>
            <br />
            <textarea
              className={`${styles.dataInput} ${styles.dataTextarea}`}
            ></textarea>
          </div>
          <div className={styles.button}>
            <Button
              variant="primary"
              label="Замовити дзвінок"
              padding="padding-sm"
              isFullWidth={true}
            />
          </div>
        </form>
      </div>
    </Modals>
  );
};

export default SupportPhone;
