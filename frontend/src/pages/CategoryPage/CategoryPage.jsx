/* eslint-disable max-len */
import React, { useEffect, useCallback, useState, useMemo } from 'react';
import {
  GetDiscountedProducts,
  GetProductsCategory,
} from '../../services/products/productsAccess.service';
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
import FilterShowbar from '../../components/common/FilterSidebar/FilterShowbar';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [productsInCategory, setProductsInCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [sortValue, setSortValue] = useState(0);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [choosenFilter, setChoosenFilter] = useState({});

  const sortOptions = [
    { value: 0, label: 'від дешевих до дорогих', labelMobile: 'Дешеві' },
    { value: 1, label: 'від дорогих до дешевих', labelMobile: 'Дорогі' },
  ];
  const sortedData = useMemo(() => {
    const sortedAcs = productsInCategory?.toSorted(
      (a, b) => a.priceWithDiscount - b.priceWithDiscount,
    );
    return sortValue === 0 ? sortedAcs : sortedAcs.toReversed();
  }, [sortValue, productsInCategory]);
  const [filterData, setFilterData] = useState({
    minPrice: 0,
    maxPrice: 999,
    discounted: false,
    type: [],
    color: [],
    size: [],
  });

  const getData = useCallback(async () => {
    try {
      let products;
      let category;
      if (categoryId === 'discounted') {
        products = await GetDiscountedProducts({
          page: currentPage,
          size: 12,
        });
        category = { name: 'Акційна ціна' };
      } else {
        products = await GetProductsCategory({
          page: currentPage,
          size: 12,
          categoryId: +categoryId,
        });
        category = await GetCategory(categoryId);
      }
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
  const resetFilter = () => {
    setFilterData((prev) => {
      const clearedFilter = {};
      for (const [key, value] of Object.entries(prev)) {
        if (key === 'discounted') {
          clearedFilter[key] = false;
        } else if (key === 'price') {
          clearedFilter[key] = value;
        } else {
          clearedFilter[key] = value.map((filter) => ({
            ...filter,
            checked: false,
          }));
        }
      }
      return clearedFilter;
    });
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
          <FilterSidebar
            visibility={isFilterOpen}
            onClose={handleClickFilter}
            categoryId={categoryId}
            data={filterData}
            setData={setChoosenFilter}
          />
          {choosenFilter}
        </div>
        <div className={styles.mainContent}>
          <div className={styles.sortBlock}>
            <div className={styles.sortDropdown}>
              <span className={styles.sortTitle}>Виводити:</span>
              <Select
                value={sortValue}
                setValue={setSortValue}
                options={sortOptions}
              />
            </div>
            <div className={styles.filterShowbar}>
              <FilterShowbar data={filterData} setData={setFilterData} />
              <Button
                label={'Скинути фільтри'}
                variant={'no-border-yellow'}
                className={styles.cancelFilter}
                onClick={resetFilter}
              />
            </div>
            <div className={styles.sortSmallDevices}>
              <DropDown
                sortValue={sortValue}
                setValue={setSortValue}
                options={sortOptions}
              />
            </div>
            <div className={styles.filterButton}>
              <Button
                label={'Фільтри'}
                icon={<ICONS.filter />}
                onClick={handleClickFilter}
              />
            </div>
          </div>
          {isLoading
            ? 'Loading ...'
            : sortedData && (
                <>
                  <div className={styles.cards}>
                    {sortedData.map((product) => (
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
                    totalCount={sortedData.length}
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
