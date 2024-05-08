import React from 'react';
import Path from '../CardPage/components/Path';
import styles from './Delivery.module.scss';
import data from '../../data/delivery.json';
import BlossomItem from '../../components/common/BlossomItem/BlossomItem';

function Delivery() {
  const { payment, delivery, whyUs } = data;
  return (
    <>
      <Path
        currentPageData={{ name: 'Доставка та оплата' }}
        currentPageType={'section'}
      />
      <div className={styles.bgCover}>
        <img className={styles.flowersBg} src="/images/flowers.svg" />
        <img className={styles.flowersBg} src="/images/flowers.svg" />
      </div>
      <section className={styles.section}>
        <h1 className={styles.title}>
          Способи Оплати та Доставка:{' '}
          <span className={styles.title_green}>
            Як Зробити Ваш Заказ Ще Зручнішим
          </span>
        </h1>
        <h3 className={styles.listTitle}>Способи Оплати:</h3>
        <ul className={styles.list}>
          {payment.map(({ title, description }) => (
            <BlossomItem title={title} description={description} key={title} />
          ))}
        </ul>
        <h3 className={styles.listTitle}>Способи Доставки:</h3>
        <ul className={styles.list}>
          {delivery.map(({ title, description }) => (
            <BlossomItem title={title} description={description} key={title} />
          ))}
        </ul>
      </section>
      <section className={styles.section}>
        <h2 className={styles.section__title}>
          Навіщо Вибирати Нашу Доставку?
        </h2>
        <ul className={styles.whyUs}>
          {whyUs.map(({ title, description }, idx) => (
            <li className={styles.whyUs__item} key={title}>
              <div className={styles.whyUs__content}>
                <h4>{title}</h4>
                <p>{description}</p>
              </div>
              <img src={`/images/whyus_${idx + 1}.jpg`} alt={title} />
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.section}>
        <h2
          className={`${styles.section__title} ${styles.section__title_wide}`}
        >
          Обирайте <span className={styles.accent}>Kvitkovo</span> для своїх
          квіткових вражень, і ми зробимо все можливе, щоб зробити їх
          неповторними та надзвичайними!
        </h2>
        <div className={styles.fromInside}>
          <img src="/images/workers.jpg" alt="Працівники нашого магазину" />
          <img src="/images/sign.jpg" alt="Вивіска Kvitkovo" />
        </div>
        <p className={styles.text}>
          У нас кожен квітковий момент —{' '}
          <span className={styles.accent}>особливий</span>.
        </p>
      </section>
    </>
  );
}
export default Delivery;
