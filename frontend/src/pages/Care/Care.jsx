import React from 'react';

import { useScroll } from '../../hooks/useScroll';
import Path from '../CardPage/components/Path';
import QuestionList from '../../components/common/QuestionList';
import data from '../../data/careListData';
import styles from './Care.module.scss';

const Care = () => {
  useScroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
    scrollOnMount: true,
  });
  return (
    <>
      <Path
        currentPageData={{ name: 'Догляд за квітами' }}
        currentPageType={'section'}
      />
      <h1 className={styles.title}>Догляд за квітами</h1>
      <div className={styles.description}>
        <p className={styles.description__text}>
          Які б домашні квіти ви не вирощували, вони мають бути здоровими.
          Багато рослин не потребують складного догляду: досить трохи уваги і
          базових знань ботаніки. Команда Kvitkovo зібрала декілька корисних
          порад про найголовніші правила їхнього догляду, які допоможуть
          покращити зберігання та догляд за квітами.
        </p>
        <img
          src="/images/care/care1.jpg"
          alt="Квіти в горщику"
          className={styles.description__img1}
        />
        <img
          src="/images/care/care2.jpg"
          alt="Кімната з квітами"
          className={styles.description__img2}
        />
      </div>
      <QuestionList data={data} />
    </>
  );
};

export default Care;
