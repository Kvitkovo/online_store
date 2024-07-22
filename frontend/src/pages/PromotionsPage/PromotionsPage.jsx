import React from 'react';

import { useScroll } from '../../hooks';
import promotions from '../../data/promotions.json';
import Path from '../CardPage/components/Path';
import { PromotionCard } from './components';
import styles from './PromotionsPage.module.scss';

const PromotionsPage = () => {
  useScroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
    scrollOnMount: true,
  });

  return (
    <>
      <Path currentPageData={{ name: 'Акції' }} currentPageType={'section'} />
      <section className={styles.section}>
        <h1 className={styles.sectionTitle}>Акції в Kvitkovo</h1>
        <ul className={styles.promotionCards}>
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
