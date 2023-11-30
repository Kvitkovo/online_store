/* eslint-disable max-len */
import React, { useEffect, useCallback, useState } from 'react';
import { GetProductsCategory } from '../../services/products/productsAccess.service';
import { GetCategory } from '../../services/catalog/categoryAccess.service';
import FilterSidebar from '../../components/common/FilterSidebar';
import styles from './CategoryPage.module.scss';
import Path from '../CardPage/components/Path';
import Card from '../../components/common/Card';
import Pagination from '../../components/ui-kit/components/Pagination';
import { useParams } from 'react-router-dom';
import Select from '../../components/ui-kit/components/Select';
import Button from '../../components/ui-kit/components/Button';
import { ICONS } from '../../components/ui-kit/icons';
import DropDown from '../../components/ui-kit/components/DropDown';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [productsInCategory, setProductsInCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [sortValue, setSortValue] = useState(0);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const sortOptionsMobile = [
    { value: 0, label: 'Дешеві' },
    { value: 1, label: 'Дорогі' },
  ];
  const sortOptions = [
    { value: 0, label: 'від дешевих до дорогих' },
    { value: 1, label: 'від дорогих до дешевих' },
  ];

  const getData = useCallback(async () => {
    try {
      const products = await GetProductsCategory({
        page: currentPage,
        size: 12,
        categoryId: +categoryId,
      });
      const category = await GetCategory(categoryId);
      setCurrentCategory(category);
      setProductsInCategory(products.content);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [categoryId, currentPage]);

  const handleClickFilter = () => {
    setFilterOpen((prev) => !prev);
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <Path currentPageData={currentCategory} currentPageType={'category'} />
      <h2 className={styles.title}>{currentCategory?.name}</h2>
      <div className={styles.mainContainer}>
        <div className={styles.filterContainer}>
          <FilterSidebar visibility={isFilterOpen} />
        </div>
        <div className={styles.mainContent}>
          <div className={styles.sortBlock}>
            <span className={styles.sortTitle}>Виводити:</span>
            <div className={styles.sortDropdown}>
              <Select
                value={sortValue}
                setValue={setSortValue}
                options={sortOptions}
              />
            </div>
            <div className={styles.sortSmallDevices}>
              <DropDown
                sortValue={sortValue}
                setValue={setSortValue}
                options={sortOptionsMobile}
              />
            </div>
            <div className={styles.filterButton}>
              <Button
                label={'Фільтри'}
                icon={<ICONS.filter />}
                onClick={handleClickFilter}
              />
            </div>
            <div className={styles.sortBlock_mobile}></div>
          </div>
          {isLoading
            ? 'Loading ...'
            : productsInCategory && (
                <>
                  <ul className={styles.cards}>
                    {productsInCategory.map((product) => (
                      <li className={styles.card} key={product.id}>
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
                          id={product.id}
                        />
                      </li>
                    ))}
                  </ul>
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
