/* eslint-disable max-len */
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import Path from '../CardPage/components/Path';
import styles from './SearchResult.module.scss';
import ProductList from '../../components/common/ProductList';
import { useParams } from 'react-router-dom';
import { GetProductsFilter } from '../../services/products/productsAccess.service';

const SearchResult = () => {
  const { query } = useParams();
  const [currentPage, setCurrentPage] = useState(null);
  const [data, setData] = useState(null);
  const quantity = useMemo(() => data?.length || 0, [data]);

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
  const getData = useCallback(async () => {
    try {
      const data = await GetProductsFilter({
        page: currentPage,
        size: 30,
        sortDirection: 'ASC',
        title: query,
      });
      setData(data.content);
    } catch (error) {
      console.error(error);
    }
  }, [currentPage, query]);

  useEffect(() => {
    getData();
  }, [getData]);
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
      <ProductList
        data={data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default SearchResult;
