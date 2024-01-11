import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from '../../Order.module.scss';
import { ICONS } from '../../../ui-kit/icons';
import Button from '../../../ui-kit/components/Button';

const DeliverForm = () => {
  const [showShopList, setShowShopList] = useState(true);
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [hideForm, setHideForm] = useState(false);
  const [address, setAddress] = useState('');
  const addressList = [
    { id: 1, address: 'вул. Хрещатик, 36' },
    { id: 2, address: 'вул. Братиславська 17' },
    { id: 3, address: 'вул. Бердичівська 15' },
  ];
  const { register, handleSubmit } = useForm({
    defaultValues: { delivery: 'Pick up from the shop' },
  });
  const onSubmit = (data) => {
    setAddress(data.address);
    setHideForm(true);
  };

  return (
    <div className={styles.orderBlock}>
      <h3 className={styles.subtitle}>
        <span>2.</span>Доставка
      </h3>
      {hideForm && (
        <div className={styles.clientDataOutput}>За адресою: {address}</div>
      )}
      <div className={styles.city}>
        <span>Місто:</span>
        <span>
          <ICONS.location />
        </span>{' '}
        <span>Київ</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Забрати з магазину</label>
          <input
            type="radio"
            value="Pick up from the shop"
            {...register('delivery')}
            onChange={() => {
              setShowDeliveryForm(false);
              setShowShopList(true);
            }}
          ></input>
        </div>
        {showShopList && (
          <div className={styles.shopAddress}>
            <select {...register('address')}>
              <option>Виберіть магазин</option>
              {addressList.map((element) => (
                <option key={element.id}>{element.address}</option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label>Доставка за адресою</label>
          <input
            type="radio"
            value="Delivery by address"
            {...register('delivery')}
            onChange={() => {
              setShowShopList(false);
              setShowDeliveryForm(true);
            }}
          ></input>
        </div>
        {showDeliveryForm && <div>Форма</div>}
        <Button
          label="Продовжити"
          variant="primary"
          padding="padding-even"
          type="submit"
        />
      </form>
    </div>
  );
};

export default DeliverForm;
