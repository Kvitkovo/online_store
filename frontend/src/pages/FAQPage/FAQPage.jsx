import React from 'react';

import { useScroll } from '../../hooks';

import data from '../../data/faq.json';

import QuestionList from '../../components/common/QuestionList';
import Path from '../CardPage/components/Path';
import styles from './FAQPage.module.scss';

const FAQPage = () => {
  useScroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
    scrollOnMount: true,
  });
  return (
    <>
      <Path
        currentPageData={{ name: 'Поширені запитання' }}
        currentPageType={'section'}
      />
      <section className={styles.section}>
        <h1 className={styles.sectionTitle}>Поширенні запитання</h1>
        <QuestionList data={data} customIcon="?" />
      </section>
    </>
  );
};

export default FAQPage;
