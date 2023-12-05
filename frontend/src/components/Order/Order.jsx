import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './Order.module.scss';
import Button from '../ui-kit/components/Button';
import { ICONS } from '../ui-kit/icons';
import InputMask from 'react-input-mask';

const Order = () => {
  const [showForm, setShowForm] = useState(false);
  const [hideForm, setHideForm] = useState(false);
  const [client, setClient] = useState('');
  const [phone, setPhone] = useState('');
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: { recipient: 'I' },
    mode: 'onBlur',
  });

  const onSubmitButton = (data) => {
    setClient(data.clientFirstName);
    setPhone(data.clientPhone);
    setHideForm(true);
  };

  const handleChangeData = () => {
    setHideForm(false);
  };

  return (
    <div className={styles.order}>
      <h2 className={styles.title}>Оформлення замовлення</h2>
      <div className={styles.mainGrid}>
        <div className={styles.contactDetails}>
          <div className={styles.subtitleBlock}>
            <h3 className={styles.subtitle}>
              <span>1.</span>Контактні дані
            </h3>
            {hideForm && (
              <div className={styles.buttonChange}>
                <Button
                  variant="no-border"
                  label="Змінити"
                  icon={<ICONS.PencilIcon />}
                  onClick={() => handleChangeData()}
                ></Button>
              </div>
            )}
          </div>
          {hideForm && (
            <div className={styles.clientDataOutput}>
              {client}, {phone}
            </div>
          )}
          {!hideForm && (
            <form
              className={styles.form}
              onSubmit={handleSubmit(onSubmitButton)}
            >
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
                    {...register('clientEmail', {
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: 'Невірна адреса електронної пошти',
                      },
                    })}
                  ></input>
                  <div>
                    {errors?.clientEmail && (
                      <p className={styles.error}>
                        {errors?.clientEmail?.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label>
                    Номер телефону<span> *</span>
                  </label>
                  <InputMask
                    type="tel"
                    inputMode="tel"
                    placeholder="+38(0XX)XXX-XX-XX"
                    mask="+38(099)999 99 99"
                    {...register('clientPhone', {
                      required: 'Вкажіть ваш номер телефону',
                      pattern: {
                        value: /^\+38\(0\d{2}\)\d{3} \d{2} \d{2}$/,
                        message: 'Невірний номер телефону',
                      },
                    })}
                  ></InputMask>
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
                    onChange={() => setShowForm(false)}
                  ></input>
                </div>
                <div>
                  <label>Інша людина</label>
                  <input
                    type="radio"
                    value="anotherPerson"
                    {...register('recipient')}
                    onChange={() => setShowForm(true)}
                  ></input>
                </div>
              </div>
              {showForm && (
                <div className={styles.anotherPerson}>
                  <div>
                    <label>
                      Введіть ім&apos;я<span> *</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ім'я одержувача"
                      {...register('recipientFirstName', {
                        required: "Вкажіть ваше ім'я",
                      })}
                    ></input>
                    <div>
                      {errors?.recipientFirstName && (
                        <p className={styles.error}>
                          {errors?.recipientFirstName?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label>Введіть прізвище</label>
                    <input
                      type="text"
                      placeholder="Прізвище одержувача"
                      {...register('recipientLastName')}
                    ></input>
                  </div>
                  <div>
                    <label>
                      Номер телефону<span> *</span>
                    </label>
                    <InputMask
                      type="tel"
                      inputMode="tel"
                      placeholder="+38(0XX)XXX-XX-XX"
                      mask="+38(099)999 99 99"
                      {...register('recipientPhone', {
                        required: 'Вкажіть номер телефону одержувача',
                        pattern: {
                          value: /^\+38\(0\d{2}\)\d{3} \d{2} \d{2}$/,
                          message: 'Невірний номер телефону',
                        },
                      })}
                    ></InputMask>
                    <div>
                      {errors?.recipientPhone && (
                        <p className={styles.error}>
                          {errors?.recipientPhone?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label>Введіть по батькові</label>
                    <input
                      type="text"
                      placeholder="По батькові одержувача"
                      {...register('recipientMiddleName')}
                    ></input>
                  </div>
                </div>
              )}
              <Button
                label="Продовжити"
                variant="primary"
                padding="padding-even"
                type="submit"
              />
            </form>
          )}
        </div>
        <div className={styles.cart}>
          <h3 className={styles.subtitle}>Інформація про замовлення</h3>
        </div>
      </div>
    </div>
  );
};
export default Order;
