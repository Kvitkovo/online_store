import React, { useState } from 'react';
import styles from './SupportMessage.module.scss';
import Modals from '../../Modals';
import IconButton from '../../../ui-kit/components/IconButton';
import { ICONS } from '../../../ui-kit/icons';
import Button from '../../../ui-kit/components/Button';

const SupportMessage = ({ toggleSupportMessage }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const validateEmail = (value) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const disallowedPattern = /\.ru$/i;
    return emailPattern.test(value) && !disallowedPattern.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Введіть своЇ дані та повідомлення');
    } else if (validateEmail(email) && name) {
      alert('Дані введено вірно: ' + name + ' ' + email + ' ' + message);
    } else {
      alert('Невірний формат email');
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
  };

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
        <form className={styles.supportForm} onSubmit={handleSubmit}>
          <p className={styles.callback}>Напишіть і ми звʼяжемося з вами.</p>
          <p className={styles.enterData}>
            Залиште вашу електронну пошту та напишіть повідомлення.
          </p>

          <div className={styles.dataContainer}>
            <label className={styles.labelData} htmlFor="name">
              Ваше ім’я
            </label>

            <input
              id="name"
              name="name"
              className={styles.dataInput}
              type="text"
              placeholder="Як до вас звертатись?"
              onChange={(e) => setName(e.target.value.trim())}
            />
          </div>

          <div className={styles.dataContainer}>
            <label className={styles.labelData} htmlFor="email">
              Ел. пошта
            </label>

            <input
              id="email"
              className={styles.dataInput}
              type="email"
              pattern="^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/"
              placeholder="Введіть електронну пошту"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
            />
          </div>

          <div className={styles.commentContainer}>
            <label className={styles.labelData} htmlFor="message">
              Повідомлення
            </label>

            <textarea
              className={`${styles.dataInput} ${styles.dataTextarea}`}
              id="message"
              value={message}
              onChange={handleTextareaChange}
            ></textarea>
          </div>
          <div className={styles.button}>
            <Button
              variant="primary"
              label="Надіслати"
              padding="padding-sm"
              isFullWidth={true}
              type="submit"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </Modals>
  );
};

export default SupportMessage;
