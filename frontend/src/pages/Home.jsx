import React from 'react';
import styles from '../scss/Home.module.scss';
import HomePageComponent from '../components/Layouts/HomePageComponent';

const Home = () => {
  return (
    <div className={styles.home}>
      <HomePageComponent />
    </div>
  );
};

export default Home;
