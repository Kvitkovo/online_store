import React from 'react';

import promotions from '../../data/promotions.json';
import Path from '../CardPage/components/Path';

import styles from './PromotionsPage.module.scss';
import PromotionCard from './components/PromotionCard/PromotionCard';

const PromotionsPage = () => {
  return (
    <>
      <Path currentPageData={{ name: 'Акції' }} currentPageType={'section'} />
      <section className={styles['section']}>
        <h1 className={styles['section-title']}>Акції в Kvitkovo</h1>
        <ul>
          {promotions.map((promotion) => (
            <li key={promotion.text}>
              <PromotionCard {...promotion} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default PromotionsPage;
