import React from 'react';
import styles from './Order.module.scss';
import Button from '../ui-kit/components/Button';

const Order = () => {
  const handleSubmit = () => {
    // console.log('Submit');
  };
  return (
    <div className={styles.order}>
      <h2 className={styles.title}>Оформлення замовлення</h2>
      <div className={styles.mainGrid}>
        <div className={styles.contactDetails}>
          <h3 className={styles.subtitle}>
            <span>1.</span>Контактні дані
          </h3>
          <form className={styles.form} onSubmit={handleSubmit()}>
            <div className={styles.clientData}>
              <div>
                <label>
                  Ваше ім&apos;я<span> *</span>
                </label>
                <input type="text" placeholder="Як до вас звертатися?"></input>
              </div>
              <div>
                <label>Ел. пошта </label>
                <input
                  type="email"
                  placeholder="Введіть електронну пошту"
                ></input>
              </div>
              <div>
                <label>
                  Номер телефону<span> *</span>
                </label>
                <input type="tel" placeholder="+38(0XX)XXX-XX-XX"></input>
              </div>
            </div>
            <Button
              label="Продовжити"
              variant="primary"
              padding="padding-even"
              onClick={handleSubmit}
            />
          </form>
        </div>
        <div className={styles.cart}>
          <h3 className={styles.subtitle}>Інформація про замовлення</h3>
        </div>
      </div>
    </div>
  );
};
export default Order;
