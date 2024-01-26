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

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [categoryProducts, setCategoryProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [productsInCategory, setProductsInCategory] = useState(0);
  const [sortValue, setSortValue] = useState(0);

  const getData = useCallback(async () => {
    try {
      let products;
      let category;
      if (categoryId === 'discounted') {
        products = await GetDiscountedProducts({
          page: currentPage,
          size: 12,
          sortDirection: sortValue === 0 ? 'ASC' : 'DESC',
        });
        category = { name: 'Акційна ціна' };
      } else {
        products = await GetProductsCategory({
          page: currentPage,
          size: 12,
          categoryId: +categoryId,
          sortDirection: sortValue === 0 ? 'ASC' : 'DESC',
        });
        category = await GetCategory(categoryId);
      }
      setCurrentCategory(category);
      setCategoryProducts(products.content);
      setProductsInCategory(products.totalElements);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [categoryId, currentPage, sortValue]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <Path currentPageData={currentCategory} currentPageType={'category'} />
      <h2 className={styles.title}>{currentCategory?.name}</h2>
      <ProductList
        data={categoryProducts}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoading={isLoading}
        totalAmount={productsInCategory}
        sortValue={sortValue}
        setSortValue={setSortValue}
      />
    </>
  );
};

export default CategoryPage;
