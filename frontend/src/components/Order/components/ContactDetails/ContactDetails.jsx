import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './ContactDetails.module.scss';
import { IMaskInput } from 'react-imask';
import Button from '../../../ui-kit/components/Button';

const ContactDetails = ({ contactData, setDataOnSubmit }) => {
  const [showForm, setShowForm] = useState(
    contactData?.recipient ? contactData?.recipient == 'anotherPerson' : false,
  );

  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    handleSubmit,
  } = useForm({
    defaultValues: {
      recipient: contactData?.recipient ? contactData.recipient : 'I',
      clientFirstName: contactData?.clientFirstName,
      clientEmail: contactData?.clientEmail,
      clientPhone: contactData?.clientPhone,
      recipientFirstName: contactData?.recipientFirstName,
      recipientLastName: contactData?.recipientLastName,
      recipientMiddleName: contactData?.recipientMiddleName,
      recipientPhone: contactData?.recipientPhone,
    },
    mode: 'onBlur',
  });

  const onSubmitButton = (data) => {
    setDataOnSubmit({
      ...data,
      outputString: data.clientFirstName + ', ' + data.clientPhone,
    });
  };

  return (
    <div>
      <form
        className={styles.contactForm}
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
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Невірна адреса електронної пошти',
                },
              })}
            ></input>
            <div>
              {errors?.clientEmail && (
                <p className={styles.error}>{errors?.clientEmail?.message}</p>
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
                <p className={styles.error}>{errors?.clientPhone?.message}</p>
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
        <div className={styles.buttonSubmit}>
          <Button
            label="Продовжити"
            variant="primary"
            padding="padding-even"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};
export default ContactDetails;
