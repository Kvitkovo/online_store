import React from 'react';
import styles from './Privacy.module.scss';
import Path from '../CardPage/components/Path';
import data from '../../data/privacyData.json';
import PrivacyListItem from './PrivacyListItem';

const Privacy = () => {
  return (
    <>
      <Path
        currentPageData={{ name: 'Політика конфіденційності' }}
        currentPageType={'section'}
      />
      <h1 className={styles.title}>
        Політика Конфіденційності для Онлайн Магазину Квітково
      </h1>
      <div className={styles.updated}>Оновлено 30.01.2024</div>
      <p className={styles.text}>
        Дякуємо, що вибрали Квітково для своїх квіткових потреб. Ми прагнемо
        забезпечити найвищий ступінь конфіденційності та захисту ваших особистих
        даних. Ця Політика Конфіденційності описує, як ми збираємо,
        використовуємо, розкриваємо та захищаємо ваші особисті дані.
      </p>
      <ul className={styles.policyList}>
        {data.privacyList.map((item, index) => {
          const { title, description, descriptionList } = item;
          return (
            <PrivacyListItem
              key={title}
              title={title}
              description={description}
              subList={descriptionList}
              index={index}
            />
          );
        })}
      </ul>
      <p className={styles.text}>
        Ця Політика Конфіденційності є складовою частиною Угоди Користувача для
        використання нашого магазину. Ми рекомендуємо вам ознайомитися з нею
        перед використанням наших послуг
      </p>
      <p className={styles.text}>
        {`Якщо у вас є будь-які питання або уточнення щодо цієї політики, будь
        ласка, зв'яжіться з нашою службою підтримки.`}
      </p>
      <div className={styles.gratitude}>
        Дякуємо, що ви обрали <span className={styles.accent}>Kvitkovo </span>
        для своїх квіткових радостей!
      </div>
    </>
  );
};

export default Privacy;
