import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './DeliveryForm.module.scss';
import { ICONS } from '../../../ui-kit/icons';
import Button from '../../../ui-kit/components/Button';

const DeliverForm = ({ deliveryData, setDataOnSubmit }) => {
  const [showShopList, setShowShopList] = useState(
    deliveryData?.delivery
      ? deliveryData.delivery == 'Pick up from the shop'
      : true,
  );

  const addressList = [
    { id: 1, address: 'вул. Квіткова 18' },
    { id: 2, address: 'вул. Братиславська 17' },
    { id: 3, address: 'вул. Бердичівська 15' },
  ];

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      delivery: deliveryData?.delivery
        ? deliveryData.delivery
        : 'Pick up from the shop',
      shopAddress: deliveryData?.shopAddress
        ? deliveryData.shopAddress
        : 'вул. Квіткова 18',
      clientStreet: deliveryData?.clientStreet,
      clientHouse: deliveryData?.clientHouse,
      clientFlat: deliveryData?.clientFlat,
    },
  });

  const onSubmit = (data) => {
    let dataForOutput;

    if (data.delivery == 'Pick up from the shop') {
      dataForOutput = data.shopAddress;
    } else {
      dataForOutput =
        data.clientStreet +
        ' ' +
        'буд. ' +
        data.clientHouse +
        ' ' +
        ' кв. ' +
        data.clientFlat;
    }

    setDataOnSubmit({
      ...data,
      outputString: dataForOutput,
    });
  };

  return (
    <>
      <div className={styles.city}>
        <span>Місто:</span>
        <span>
          <ICONS.location />
        </span>
        <span>Київ</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.formDelivery}>
        <div className={styles.radioBtn}>
          <label>Забрати з магазину</label>
          <input
            type="radio"
            value="Pick up from the shop"
            {...register('delivery')}
            onChange={() => {
              setShowShopList(true);
            }}
          ></input>
        </div>
        {showShopList && (
          <div className={styles.shopAddress}>
            <select {...register('shopAddress')}>
              {addressList.map((element) => (
                <option key={element.id}>{element.address}</option>
              ))}
            </select>
          </div>
        )}
        <div className={styles.radioBtn}>
          <label>Доставка за адресою</label>
          <input
            type="radio"
            value="Delivery by address"
            {...register('delivery')}
            onChange={() => {
              setShowShopList(false);
            }}
          ></input>
        </div>
        {!showShopList && (
          <div className={styles.clientDeliveryData}>
            <div className={styles.street}>
              <label>Вулиця</label>
              <input
                type="text"
                placeholder="Введіть назву вулиці"
                {...register('clientStreet', {
                  required: 'Вкажіть вулицю',
                })}
              ></input>
              <div>
                {errors?.clientStreet && (
                  <p className={styles.error}>
                    {errors?.clientStreet?.message}
                  </p>
                )}
              </div>
            </div>
            <div className={styles.house}>
              <div>
                <label>Будинок</label>
                <input
                  type="text"
                  placeholder="Будинок"
                  {...register('clientHouse', {
                    required: 'Вкажіть будинок',
                  })}
                ></input>
                <div>
                  {errors?.clientHouse && (
                    <p className={styles.error}>
                      {errors?.clientHouse?.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label>Квартира</label>
                <input
                  type="text"
                  placeholder="Квартира"
                  {...register('clientFlat', {
                    required: 'Вкажіть квартиру',
                  })}
                ></input>
              </div>
            </div>
          </div>
        )}
        <div className={styles.continueButton}>
          <Button
            label="Продовжити"
            variant="primary"
            padding="padding-even"
            type="submit"
          />
        </div>
      </form>
    </>
  );
};

export default DeliverForm;
