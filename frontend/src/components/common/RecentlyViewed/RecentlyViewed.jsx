import React from 'react';
import Slider from './Slider';
import styles from './RecentlyViewed.module.scss';

const RecentlyViewed = () => {
  const recentlyViewed = Array.from(
    JSON.parse(localStorage.getItem('recentlyViewed') || ''),
  );
  return (
    <>
      {recentlyViewed.length > 1 && (
        <div className={styles.container}>
          <h2 className={styles.title}>Раніше переглянуті</h2>
          <Slider data={recentlyViewed} />
        </div>
      )}
    </>
  );
};

export default RecentlyViewed;
