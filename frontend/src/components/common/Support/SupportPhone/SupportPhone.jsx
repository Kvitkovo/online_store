import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import styles from './SupportPhone.module.scss';
import Modals from '../../Modals';
import { ICONS } from '../../../ui-kit/icons';
import IconButton from '../../../ui-kit/components/IconButton';
import Button from '../../../ui-kit/components/Button';
import FormSubmitted from '../FormSubmitted/FormSubmitted';

import { useModalEffect } from '../../../../hooks/useModalEffect';

const SupportPhone = ({ toggleSupportPhone }) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [showFormSubmitted, setShowFormSubmitted] = useState(false);

  const validatePhone = (value) => /^\+380 \d{2} \d{7}$/.test(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setNameError(!name);
    setPhoneError(!phone);

    if (validatePhone(phone) && name) {
      setShowFormSubmitted(true);
    }
  };

  useModalEffect(showFormSubmitted);
  return (
    <>
      {!showFormSubmitted && (
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
            <form onSubmit={handleSubmit}>
              <p className={styles.callback}>Бажаєте, ми вам передзвонимо?</p>
              <p className={styles.enterData}>
                Введіть номер телефону та ім’я, і ми зв’яжемося з вами.
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
                className={`${styles.dataContainer} ${styles.phoneContainer}`}
              >
                <label className={styles.labelData} htmlFor="phone">
                  Номер телефону {phoneError && <span>*</span>}
                </label>

                <InputMask
                  id="phone"
                  className={styles.dataInput}
                  mask="+380 99 9999999"
                  maskChar=""
                  placeholder="+380 XX XXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {submitted && !phone && (
                  <p className={styles.errorMessage}>Введіть номер телефону</p>
                )}
                {submitted && phone && !validatePhone(phone) && (
                  <p className={styles.errorMessage}>
                    Невірний формат номеру телефона
                  </p>
                )}
              </div>

              <div className={styles.commentContainer}>
                <label className={styles.labelData} htmlFor="message">
                  Коментар
                </label>

                <textarea
                  id="message"
                  className={`${styles.dataInput} ${styles.dataTextarea}`}
                ></textarea>
              </div>
              <div className={styles.button}>
                <Button
                  variant="primary"
                  label="Замовити дзвінок"
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
            toggleSupportPhone();
          }}
        />
      )}
    </>
  );
};

export default SupportPhone;
