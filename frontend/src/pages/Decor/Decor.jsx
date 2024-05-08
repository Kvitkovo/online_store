import React from 'react';
import styles from './Decor.module.scss';
import Path from '../CardPage/components/Path';
import { useForm } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import Button from '../../components/ui-kit/components/Button';
import axiosInstance from '../../services/httpClient';
import { useNavigate } from 'react-router-dom';

const addDecorRequest = async (request) => {
  try {
    const response = await axiosInstance.post('/decor', request);
    if (response.status === 200) {
      return response.data.id;
    } else {
      throw new Error(`Помилка: Отримано статус відповіді ${response.status}`);
    }
  } catch (error) {
    console.error(
      'Виникла помилка під час виконання запиту до сервера:',
      error.message,
    );
  }
};

const Decor = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      comment: '',
    },
  });
  const onSubmit = async (data) => {
    const { customerName, customerPhone, customerEmail, comment } = data;
    const result = await addDecorRequest({
      customerName,
      customerPhone: customerPhone.replaceAll(/[-()]/g, ''),
      customerEmail,
      comment,
      shopId: 1,
    });
    if (result) {
      navigate('/', { state: { action: 'decor sended' } });
    }
  };
  return (
    <>
      <div className={styles.path}>
        <Path
          currentPageData={{ name: 'Заявки на декор' }}
          currentPageType={'section'}
        />
      </div>

      <section className={styles.decor}>
        <div className={styles.imgs}>
          <img
            className={styles.bgImg}
            src="/images/decor_leftTop.jpg"
            alt="Кімната з квітами"
          />
          <img
            className={styles.bgImg}
            src="/images/decor_leftBottom.jpg"
            alt="Кімната з квітами"
          />
          <img
            className={styles.bgImg}
            src="/images/decor_right.jpg"
            alt="Кімната з квітами"
          />
        </div>
        <h1 className={styles.decor__title}>Декор із квітів</h1>
        <p className={styles.decor__description}>
          Шановній кліент, ми ради запропонувати вам послуги декору зі квітів.
          Наша команда флористів має великий досвід та багато рішень у створенні
          неповторних та особливих декорацій із живих квітів під будь-які
          забагання.
        </p>
        <h2 className={`${styles.decor__title} ${styles.decor__title_second}`}>
          Надішліть нам заявку і наші спеціалісти звя’жуться з вами!
        </h2>
        <form className={styles.decor__form} onSubmit={handleSubmit(onSubmit)}>
          <label>Ваше ім&apos;я</label>
          <input
            {...register('customerName', {
              required: "Вкажіть ваше ім'я",
            })}
            placeholder="Як до вас звертатись?"
          />
          <div>
            {errors?.customerName && (
              <p className={styles.error}>{errors.customerName?.message}</p>
            )}
          </div>
          <label>Номер телефону</label>
          <IMaskInput
            type="tel"
            inputMode="tel"
            placeholder="+38(0XX)XXX-XX-XX"
            mask="+{38\0}{(}00{)}000-00-00"
            onAccept={(value) => setValue('customerPhone', value)}
            {...register('customerPhone', {
              required: 'Вкажіть ваш номер телефону',
              pattern: {
                value: /^\+380\(\d{2}\)\d{3}-\d{2}-\d{2}$/,
                message: 'Невірний номер телефону',
              },
            })}
          ></IMaskInput>
          <div>
            {errors?.customerPhone && (
              <p className={styles.error}>{errors.customerPhone?.message}</p>
            )}
          </div>
          <label>Ел. пошта</label>
          <input
            {...register('customerEmail', {
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Невірна адреса електронної пошти',
              },
              required: 'Вкажіть ваш email',
            })}
            placeholder="Введіть електронну пошту"
          />
          <div>
            {errors?.customerEmail && (
              <p className={styles.error}>{errors?.customerEmail?.message}</p>
            )}
          </div>
          <label>Коментар</label>

          <textarea
            className={styles.decor__comment}
            {...register('comment')}
          />
          <Button
            label="Надіслати заявку"
            variant="primary"
            padding="padding-even"
            type="submit"
          />
        </form>
      </section>
    </>
  );
};

export default Decor;
