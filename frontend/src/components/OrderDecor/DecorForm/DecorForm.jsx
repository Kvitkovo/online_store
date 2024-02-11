import styles from './DecorForm.module.scss';
import React from 'react';
import { useForm } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import Button from './../../ui-kit/components/Button';

const DecorForm = ({ customerData, setDataOnSubmit }) => {
  const {
    register,
    formState: { errors },
    reset,
    setValue,
    getValues,
    handleSubmit,
  } = useForm({
    defaultValues: {
      customerName: customerData?.customerName,
      customerEmail: customerData?.customerEmail,
      customerPhone: customerData?.customerPhone,
      comment: customerData?.comment,
    },
    mode: 'onBlur',
  });

  const onSubmitDecor = (data) => {
    setDataOnSubmit({
      ...data,
      outputString: data.customerName + ', ' + data.customerPhone,
    });
  };

  return (
    <>
      <form className={styles.decorForm}>
        <div className={styles.customerData}>
          <div>
            <label htmlFor="customerName">Ваше ім&apos;я *</label>
            <input
              type="text"
              id="customerName"
              placeholder="Як до вас звертатись?"
              {...register('customerName', {
                required: "Вкажіть ваше ім'я",
                pattern: {
                  value: /^[a-zA-ZА-Яа-яЁё\s]+$/,
                  message: "Невірне ім'я",
                },
              })}
            ></input>
            <div>
              {errors?.customerName && (
                <p className={styles.error}>{errors?.customerName?.message}</p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="customerPhone">Номер телефону *</label>
            <IMaskInput
              type="tel"
              id="customerPhone"
              placeholder="+380(XX)XXX-XX-XX"
              mask="+{38\0} {(}00{)} 000 00 00"
              onAccept={(value) => setValue('customerPhone', value)}
              value={getValues('customerPhone')}
              {...register('customerPhone', {
                required: 'Вкажіть ваш номер телефону',
                pattern: {
                  value: /^\+380 \(\d{2}\) \d{3} \d{2} \d{2}$/,
                  message: 'Невірний номер телефону',
                },
              })}
            ></IMaskInput>
            <div>
              {errors?.customerPhone && (
                <p className={styles.error}>{errors?.customerPhone?.message}</p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="customerEmail">Ел. пошта *</label>
            <input
              type="email"
              id="customerEmail"
              placeholder="Введіть електронну пошту"
              {...register('customerEmail', {
                required: 'Вкажіть ваш email',
                minLength: 6,
                maxLength: 320,
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Невірна адреса електронної пошти',
                },
              })}
            ></input>
            <div>
              {errors?.customerEmail && (
                <p className={styles.error}>{errors?.customerEmail?.message}</p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="comment">Коментар</label>
            <textarea
              type="text"
              id="comment"
              rows={200}
              placeholder=" "
              {...register('comment', {
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                },
              })}
            ></textarea>
          </div>
        </div>
        <div className={styles.buttonSubmit}>
          <Button
            label="Надіслати заявку"
            variant="primary"
            padding="padding-even"
            type="submit"
            onSubmit={handleSubmit(onSubmitDecor)}
            onClick={() => reset()}
          />
        </div>{' '}
      </form>
    </>
  );
};
export default DecorForm;
