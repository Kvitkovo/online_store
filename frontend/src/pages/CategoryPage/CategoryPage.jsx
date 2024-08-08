/* eslint-disable max-len */
import React, { useEffect, useCallback, useState } from 'react';
import {
  GetDiscountedProducts,
  GetProductsCategory,
} from '../../services/products/productsAccess.service';
import { GetCategory } from '../../services/catalog/categoryAccess.service';
import styles from './CategoryPage.module.scss';
import Path from '../CardPage/components/Path';
import { useParams } from 'react-router-dom';

import ProductList from '../../components/common/ProductList';
import { useScroll } from '../../hooks/useScroll';

const CategoryPage = React.memo(() => {
  const { categoryId } = useParams();
  const [categoryProducts, setCategoryProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [productsInCategory, setProductsInCategory] = useState(0);

  const scroll = useScroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });

  const getData = useCallback(async () => {
    try {
      let products;
      let category;
      if (categoryId === 'discounted') {
        products = await GetDiscountedProducts({
          page: currentPage,
          size: 12,
          sortDirection: 'ASC',
        });
        category = { name: 'Акційна ціна' };
      } else {
        products = await GetProductsCategory({
          page: currentPage,
          size: 12,
          categoryId: +categoryId,
          sortDirection: 'ASC',
        });
        category = await GetCategory(categoryId);
      }
      setCurrentCategory(category);
      setCategoryProducts({
        data: products.content,
        totalAmount: products.totalElements,
      });
      setProductsInCategory(products.totalElements);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      scroll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, currentPage]);
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId]);
  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <Path currentPageData={currentCategory} currentPageType={'category'} />
      <h2 className={styles.title}>{currentCategory?.name}</h2>
      {categoryProducts && (
        <ProductList
          data={categoryProducts}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isLoading={isLoading}
          totalAmount={productsInCategory}
          setTotalAmount={setProductsInCategory}
        />
      )}
    </>
  );
});

export default CategoryPage;
