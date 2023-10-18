import React from 'react';
import styles from './SupportMessage.module.scss';
import Modals from '../../Modals';
import IconButton from '../../../ui-kit/components/IconButton';
import { ICONS } from '../../../ui-kit/icons';
import Button from '../../../ui-kit/components/Button';

const SupportMessage = ({ toggleSupportMessage }) => {
  return (
    <Modals type="support" onClick={toggleSupportMessage}>
      <div className={styles.header}>
        <div className={styles.headerContent}> Підтримка</div>
        <div className={styles.iconContainer}>
          <IconButton
            onClick={toggleSupportMessage}
            icon={<ICONS.closeMobile />}
          />
        </div>
      </div>

      <div className={styles.formContainer}>
        <form className={styles.supportForm}>
          <p className={styles.callback}>Напишіть і ми звʼяжемося з вами.</p>
          <p className={styles.enterData}>
            Залиште вашу електронну пошту та напишіть повідомлення.
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
            <label className={styles.labelData} htmlFor="email">
              Ел. пошта
            </label>
            <br />
            <input
              className={styles.dataInput}
              type="email"
              placeholder="Введіть електронну пошту"
            />
          </div>

          <div className={styles.commentContainer}>
            <label className={styles.labelData} htmlFor="message">
              Повідомлення
            </label>
            <br />
            <textarea
              className={`${styles.dataInput} ${styles.dataTextarea}`}
            ></textarea>
          </div>
          <div className={styles.button}>
            <Button
              variant="primary"
              label="Надіслати"
              padding="padding-sm"
              isFullWidth={true}
            />
          </div>
        </form>
      </div>
    </Modals>
  );
};

export default SupportMessage;
