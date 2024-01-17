/* eslint-disable max-len */
import React, { useEffect, useCallback, useState, useMemo } from 'react';
import {
  GetDiscountedProducts,
  GetProductsCategory,
  GetProductsFilter,
} from '../../services/products/productsAccess.service';
import {
  GetMinMaxPrice,
  GetFiltersInCategory,
  GetCategory,
} from '../../services/catalog/categoryAccess.service';
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
  const [categoryProducts, setCategoryProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [sortValue, setSortValue] = useState(0);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({});
  const [filteredList, setFilteredList] = useState(null);
  // const [isBtnVisible, setBtnVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);

  const sortOptions = [
    { value: 0, label: 'від дешевих до дорогих', labelMobile: 'Дешеві' },
    { value: 1, label: 'від дорогих до дешевих', labelMobile: 'Дорогі' },
  ];
  const sortedData = useMemo(() => {
    const sortedAcs = filteredList?.toSorted(
      (a, b) => a.priceWithDiscount - b.priceWithDiscount,
    );
    return sortValue === 0 ? sortedAcs : sortedAcs.toReversed();
  }, [sortValue, filteredList]);
  const [initialFilterData, setInitialFilterData] = useState({
    priceFrom: 0,
    priceTo: 999,
    discounted: false,
    types: [],
    colors: [],
    sizes: [],
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
      setCategoryProducts(products.content);
      setFilteredList(products.content);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [categoryId, currentPage]);

  const getFilterData = useCallback(async () => {
    const result = await GetFiltersInCategory(categoryId);
    const minMaxPrice = await GetMinMaxPrice({ categoryId: categoryId });
    setInitialFilterData((prev) => ({
      ...prev,
      priceFrom: minMaxPrice.minPrice,
      priceTo: minMaxPrice.maxPrice,
    }));

    for (const [key, value] of Object.entries(result)) {
      const filterOptions = Object.entries(value).map(([key, value]) => ({
        id: key,
        name: value,
      }));
      setInitialFilterData((prev) => ({
        ...prev,
        [key.toLowerCase() + 's']: filterOptions,
      }));
    }
  }, [categoryId, setInitialFilterData]);
  const getFilteredData = useCallback(
    async (selected) => {
      try {
        if (Object.keys(selected).length > 0) {
          const data = await GetProductsFilter({
            page: currentPage,
            size: 30,
            categoryId: categoryId,
            ...selected,
            sortDirection: sortValue === 0 ? 'ASC' : 'DESC',
          });
          setFilteredList(data.content);
        }
      } catch (error) {
        console.error(error);
      } finally {
        toggleFilter();
        setActiveFilter(null);
      }
    },
    [categoryId, currentPage, sortValue],
  );

  const toggleFilter = () => {
    setFilterOpen((prev) => !prev);
  };
  const resetFilter = () => {
    setSelectedFilter({});
    setFilteredList(categoryProducts);
    setActiveFilter(null);
  };

  useEffect(() => {
    if (Object.keys(selectedFilter).length > 0) {
      const timeoutId = setTimeout(() => {
        getFilteredData(selectedFilter);
      }, 4500);

      return () => clearTimeout(timeoutId);
    } else {
      setFilteredList(categoryProducts);
      setActiveFilter(null);
    }
  }, [categoryProducts, getFilteredData, selectedFilter]);

  useEffect(() => {
    getFilterData();
  }, [getFilterData]);

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
            onClose={toggleFilter}
            data={initialFilterData}
            selectedFilter={selectedFilter}
            setData={setSelectedFilter}
            handleFilter={getFilteredData}
            resetFilter={resetFilter}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
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
            {Object.keys(selectedFilter).length > 0 && (
              <div className={styles.filterShowbar}>
                <FilterShowbar
                  selected={selectedFilter}
                  data={initialFilterData}
                  setData={setSelectedFilter}
                  handleFilter={getFilteredData}
                />
                <Button
                  label={'Скинути фільтри'}
                  variant={'no-border-yellow'}
                  className={styles.cancelFilter}
                  onClick={resetFilter}
                />
              </div>
            )}
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
                onClick={toggleFilter}
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
