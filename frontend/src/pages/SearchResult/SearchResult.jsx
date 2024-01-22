import React from 'react';
import Path from '../CardPage/components/Path';
import styles from './SearchResult.module.scss';
import ProductList from '../../components/common/ProductList';

const SearchResult = ({ query, data }) => {
  const quantity = 123;
  const getProductEnding = (amount) => {
    if (amount % 10 === 1 && amount % 100 !== 11) {
      return 'товар';
    } else if (
      amount % 10 >= 2 &&
      amount % 10 <= 4 &&
      (amount % 100 < 10 || amount % 100 >= 20)
    ) {
      return 'товари';
    } else {
      return 'товарів';
    }
  };

  return (
    <>
      <Path
        currentPageData={{ name: 'Результати пошуку' }}
        currentPageType={'section'}
      />
      <h2 className={styles.title}>
        Результати пошуку: <span className={styles.query}>{query}</span>
        <span className={styles.amount}>{` ${quantity} ${getProductEnding(
          quantity,
        )}`}</span>
      </h2>
      <ProductList data={data} />
    </>
  );
};

export default SearchResult;
