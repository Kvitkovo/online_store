import React, { useState } from 'react';
import styles from './SupportMessage.module.scss';
import Modals from '../../Modals';
import IconButton from '../../../ui-kit/components/IconButton';
import { ICONS } from '../../../ui-kit/icons';
import Button from '../../../ui-kit/components/Button';
import FormSubmitted from '../FormSubmitted/FormSubmitted';
import { useModalEffect } from '../../../../hooks/useModalEffect';

const SupportMessage = ({ toggleSupportMessage }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showFormSubmitted, setShowFormSubmitted] = useState(false);

  const validateEmail = (value) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const disallowedPattern = /\.ru$/i;
    return emailPattern.test(value) && !disallowedPattern.test(value);
  };

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setEmailError(!email || !validateEmail(email));
    setNameError(!name);
    setMessageError(!message);
    if (validateEmail(email) && name && message) {
      setShowFormSubmitted(true);
    }
  };
  useModalEffect(showFormSubmitted);

  return (
    <>
      {!showFormSubmitted && (
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
            <form onSubmit={handleSubmit}>
              <p className={styles.callback}>
                Напишіть і ми звʼяжемося з вами.
              </p>
              <p className={styles.enterData}>
                Залиште вашу електронну пошту та напишіть повідомлення.
              </p>

              <div className={styles.dataContainer}>
                <label className={styles.labelData} htmlFor="name">
                  Ваше ім’я {nameError && <span>*</span>}
                </label>

                <input
                  id="name"
                  name="name"
                  className={styles.dataInput}
                  type="text"
                  placeholder="Як до вас звертатись?"
                  onChange={(e) => setName(e.target.value.trim())}
                />
                {submitted && !name && (
                  <p className={styles.errorMessage}>Введіть ваше ім`я</p>
                )}
              </div>

              <div
                className={`${styles.dataContainer} ${styles.emailContainer}`}
              >
                <label className={styles.labelData} htmlFor="email">
                  Ел. пошта пошта {emailError && <span>*</span>}
                </label>

                <input
                  id="email"
                  className={styles.dataInput}
                  type="email"
                  pattern="^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
                  placeholder="Введіть електронну пошту"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                />
                {submitted && !email && (
                  <p className={styles.errorMessage}>
                    Введіть електронну пошту
                  </p>
                )}
                {submitted && email && !validateEmail(email) && (
                  <p className={styles.errorMessage}>
                    Невірний формат електронної пошти
                  </p>
                )}
              </div>

              <div className={styles.commentContainer}>
                <label className={styles.labelData} htmlFor="message">
                  Повідомлення {messageError && <span>*</span>}
                </label>
                <textarea
                  className={`${styles.dataInput} ${styles.dataTextarea}`}
                  id="message"
                  value={message}
                  onChange={handleTextareaChange}
                ></textarea>
                {submitted && !message && (
                  <p className={styles.errorMessage}>Введіть повідомлення</p>
                )}
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
      )}
      {showFormSubmitted && (
        <FormSubmitted
          toggleSubmittedMessage={() => {
            setShowFormSubmitted(false);
            toggleSupportMessage();
          }}
        />
      )}
    </>
  );
};

export default SupportMessage;
