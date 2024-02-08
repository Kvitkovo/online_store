/* eslint-disable max-len */
import React, { useState, useCallback, useEffect } from 'react';
import Path from '../CardPage/components/Path';
import styles from './SearchResult.module.scss';
import ProductList from '../../components/common/ProductList';
import { useParams } from 'react-router-dom';
import { GetProductsFilter } from '../../services/products/productsAccess.service';
import RecentlyViewed from '../../components/common/RecentlyViewed/RecentlyViewed';

const SearchResult = () => {
  const { query } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);
  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const isResultFound = data?.length > 0 || false;
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
      setLoading(true);
      const data = await GetProductsFilter({
        page: currentPage,
        size: 12,
        sortDirection: 'ASC',
        title: query,
      });
      setData(data.content);
      setQuantity(data.totalElements);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, query]);

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <>
      {data && (
        <>
          <Path
            currentPageData={{ name: 'Результати пошуку' }}
            currentPageType={'section'}
          />
          <h2 className={styles.title}>
            Результати пошуку:{' '}
            {isResultFound && (
              <>
                <span className={styles.query}>{query}</span>
                <span
                  className={styles.amount}
                >{` ${quantity} ${getProductEnding(quantity)}`}</span>
              </>
            )}
          </h2>
          {!isLoading && isResultFound && (
            <ProductList
              data={data}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              query={query}
              totalAmount={quantity}
            />
          )}
          {!isResultFound && (
            <>
              <p>
                За запитом <span className={styles.query}>{query}</span>
                <span className={styles.noResult}> Нічого не знайдено</span>
              </p>
              <RecentlyViewed />
            </>
          )}
        </>
      )}
    </>
  );
};

export default SearchResult;
