import React from 'react';
import styles from './DecorInfo.module.scss';

const DecorInfo = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Декор із квітів</h3>
        <p className={styles.desc}>
          Шановний клієнт, ми раді запропонувати вам послуги декору із квітів.
          Наша команда флористів має великий досвід та багато рішень у створенні
          неповторних та особливих декорацій із живих квітів під будь-які
          забагання.
        </p>
        <p className={styles.subtitle}>
          Надішліть нам заявку і наші спеціалісти зв’яжуться з вами!
        </p>
      </div>
    </>
  );
};

export default DecorInfo;
