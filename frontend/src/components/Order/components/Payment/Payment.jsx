import React from 'react';
import styles from './Payment.module.scss';
import { useForm } from 'react-hook-form';
import Button from '../../../ui-kit/components/Button';

const Payment = ({ paymentData, setDataOnSubmit }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { payment: paymentData?.payment || 'Payment by cash' },
  });
  const onSubmit = (data) => {
    let dataForOutput;
    if (data.payment === 'Payment by cash') {
      dataForOutput = 'Oплата під час отримання';
    } else {
      dataForOutput = 'Oплата Visa/MaterCard';
    }
    setDataOnSubmit({ ...data, outputString: dataForOutput });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.paymentForm}>
        <div className={styles.radioBtn}>
          <label>Оплата під час отримання</label>
          <input
            type="radio"
            value="Payment by cash"
            {...register('payment')}
          />
        </div>
        <p className={styles.description}>
          Ви можете оплатити замовлення готівкою або банківською картою при
          отриманні замовлення
        </p>

        <div className={styles.radioBtn}>
          <label>Visa / MasterCard</label>
          <input
            type="radio"
            value="Payment by card"
            {...register('payment')}
          />
        </div>
        <p className={styles.description}>
          Після оформлення замовлення з вами зв’яжеться оператор та надішле
          реквізити для оплати.
        </p>
        <div className={styles.continueButton}>
          <Button
            label="Підтвердити"
            variant="primary"
            padding="padding-even"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default Payment;
