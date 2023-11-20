/* eslint-disable max-len */
import React, { useEffect, useCallback, useState } from 'react';
import { GetProductsCategory } from '../../services/products/productsAccess.service';
import FilterSidebar from '../../components/common/FilterSidebar';
import styles from './CategoryPage.module.scss';
// import Path from '../CardPage/components/Path';
import Card from '../../components/common/Card';
import Pagination from '../../components/ui-kit/components/Pagination/Pagination';
import { useParams } from 'react-router-dom';
import DropDown from '../../components/ui-kit/components/DropDown';

const CategoryPage = () => {
  const { myId } = useParams();
  const [productsInCategory, setProductsInCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const sortOptions = ['від дешевих до дорогих', 'від дорогих до дешевих'];
  const getData = useCallback(async () => {
    try {
      const products = await GetProductsCategory({
        page: currentPage,
        size: 12,
        categoryId: +myId,
      });
      setProductsInCategory(products.content);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  }, [myId, currentPage]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <div className={styles.path}>{/* <Path /> */}</div>
      <h2 className={styles.title}>categoryName</h2>
      <div className={styles.mainContainer}>
        <div className={styles.filterContainer}>
          <FilterSidebar />
        </div>
        <div className={styles.mainContent}>
          <div className={styles.sortBlock}>
            <span className={styles.sortTitle}>Виводити:</span>
            <div className={styles.sortDropdown}>
              <DropDown initualValue={0} options={sortOptions} />
            </div>
          </div>
          {isLoading ? (
            'Loading ...'
          ) : (
            <>
              <div className={styles.cards}>
                {productsInCategory.map((product) => (
                  <Card
                    image={
                      product.images[0]
                        ? product.images[0].urlSmall
                        : './images/no_image.jpg'
                    }
                    title={product.title}
                    discount={product.discount}
                    oldPrice={product.price}
                    price={product.priceWithDiscount}
                    available={product.available}
                    key={product.id}
                    id={product.id}
                  />
                ))}
              </div>
              <Pagination
                onPageChange={setCurrentPage}
                totalCount={productsInCategory.length}
                currentPage={currentPage}
                pageSize={12}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
