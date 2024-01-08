import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './Order.module.scss';
import Button from '../ui-kit/components/Button';
import { ICONS } from '../ui-kit/icons';
import { IMaskInput } from 'react-imask';
import OrderInfo from './components/OrderInfo';

const Order = () => {
  const [showForm, setShowForm] = useState(false);
  const [hideForm, setHideForm] = useState(false);
  const [client, setClient] = useState('');
  const [phone, setPhone] = useState('');
  const [showShopList, setShowShopList] = useState(true);
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    handleSubmit,
  } = useForm({
    defaultValues: { recipient: 'I' },
    mode: 'onBlur',
  });

  const { register: registerDelivery } = useForm({
    defaultValues: { delivery: 'Pick up from the shop' },
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
        <div>
          <div className={styles.orderBlock}>
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
                    <IMaskInput
                      type="tel"
                      inputMode="tel"
                      placeholder="+380 (XX) XXX-XX-XX"
                      mask="+{38\0} {(}00{)} 000 00 00"
                      onAccept={(value) => setValue('clientPhone', value)}
                      value={getValues('clientPhone')}
                      {...register('clientPhone', {
                        required: 'Вкажіть ваш номер телефону',
                        pattern: {
                          value: /^\+380 \(\d{2}\) \d{3} \d{2} \d{2}$/,
                          message: 'Невірний номер телефону',
                        },
                      })}
                    ></IMaskInput>
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
                        Ім&apos;я одержувача<span> *</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Введіть ім’я одержувача"
                        {...register('recipientFirstName', {
                          required: 'Введіть ім’я одержувача',
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
                      <label>Прізвище одержувача</label>
                      <input
                        type="text"
                        placeholder="Введіть прізвище одержувача"
                        {...register('recipientLastName')}
                      ></input>
                    </div>
                    <div>
                      <label>
                        Номер телефону<span> *</span>
                      </label>
                      <IMaskInput
                        type="tel"
                        inputMode="tel"
                        placeholder="+380 (XX) XXX-XX-XX"
                        mask="+{38\0}{(}00{)}000 00 00"
                        onAccept={(value) => setValue('recipientPhone', value)}
                        value={getValues('recipientPhone')}
                        {...register('recipientPhone', {
                          required: 'Вкажіть номер телефону одержувача',
                          pattern: {
                            value: /^\+380\(\d{2}\)\d{3} \d{2} \d{2}$/,
                            message: 'Невірний номер телефону',
                          },
                        })}
                      ></IMaskInput>
                      <div>
                        {errors?.recipientPhone && (
                          <p className={styles.error}>
                            {errors?.recipientPhone?.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label>По батькові одержувача</label>
                      <input
                        type="text"
                        placeholder="Введіть по батькові одержувача"
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
          <div className={styles.orderBlock}>
            <h3 className={styles.subtitle}>
              <span>2.</span>Доставка
            </h3>
            <div className={styles.city}>
              <span>Місто:</span>
              <span>
                <ICONS.location />
              </span>{' '}
              <span>Київ</span>
            </div>
            <div>
              <div>
                <label>Забрати з магазину</label>
                <input
                  type="radio"
                  value="Pick up from the shop"
                  {...registerDelivery('delivery')}
                  onChange={() => {
                    setShowDeliveryForm(false);
                    setShowShopList(true);
                  }}
                ></input>
              </div>
              {showShopList && <div> Випадаючий список</div>}
              <div>
                <label>Доставка за адресою</label>
                <input
                  type="radio"
                  value="Delivery by address"
                  {...registerDelivery('delivery')}
                  onChange={() => {
                    setShowShopList(false);
                    setShowDeliveryForm(true);
                  }}
                ></input>
              </div>
              {showDeliveryForm && <div>Форма</div>}
            </div>
          </div>
        </div>
        <OrderInfo />
      </div>
    </div>
  );
};
export default Order;
