import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './Order.module.scss';
import Button from '../ui-kit/components/Button';

const Order = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: { recipient: 'I' },
  });

  const onSubmitButton = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <div className={styles.order}>
      <h2 className={styles.title}>Оформлення замовлення</h2>
      <div className={styles.mainGrid}>
        <div className={styles.contactDetails}>
          <h3 className={styles.subtitle}>
            <span>1.</span>Контактні дані
          </h3>
          <form className={styles.form} onSubmit={handleSubmit(onSubmitButton)}>
            <div className={styles.clientData}>
              <div>
                <label>
                  Ваше ім&apos;я<span> *</span>
                </label>
                <input
                  type="text"
                  placeholder="Як до вас звертатися?"
                  {...register('clientFirstName', {
                    required: "Вкажіть ваше ім'я",
                  })}
                ></input>
                <div>
                  {errors?.clientFirstName && (
                    <p className={styles.error}>
                      {errors?.clientFirstName?.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label>Ел. пошта </label>
                <input
                  type="email"
                  placeholder="Введіть електронну пошту"
                  {...register('clientEmail')}
                ></input>
              </div>
              <div>
                <label>
                  Номер телефону<span> *</span>
                </label>
                <input
                  type="tel"
                  placeholder="+38(0XX)XXX-XX-XX"
                  {...register('clientPhone', {
                    required: 'Вкажіть ваш номер телефону',
                  })}
                ></input>
                <div>
                  {errors?.clientPhone && (
                    <p className={styles.error}>
                      {errors?.clientPhone?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.radioBtn}>
              Одержувач:
              <div>
                <label>Я</label>
                <input
                  type="radio"
                  value="I"
                  {...register('recipient')}
                ></input>
              </div>
              <div>
                <label>Інша людина</label>
                <input
                  type="radio"
                  value="anotherPerson"
                  {...register('recipient')}
                ></input>
              </div>
            </div>
            <Button
              label="Продовжити"
              variant="primary"
              padding="padding-even"
              type="submit"
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
