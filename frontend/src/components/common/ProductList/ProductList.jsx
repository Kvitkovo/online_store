/* eslint-disable max-len */
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import styles from './ProductList.module.scss';
import Select from '../../ui-kit/components/Select';
import Button from '../../ui-kit/components/Button';
import { ICONS } from '../../ui-kit/icons';
import DropDown from '../../ui-kit/components/DropDown';
import FilterShowbar from '../FilterSidebar/FilterShowbar';
import FilterSidebar from '../FilterSidebar';
import { GetProductsFilter } from '../../../services/products/productsAccess.service';
import {
  GetMinMaxPrice,
  GetFiltersInCategory,
  GetFiltersForDiscounted,
  GetPricesForDiscounted,
} from '../../../services/catalog/categoryAccess.service';
import { useParams } from 'react-router-dom';
import Card from '../Card';
import Pagination from '../../ui-kit/components/Pagination';

const ProductList = ({
  data,
  setCurrentPage,
  currentPage = 1,
  isLoading = false,
}) => {
  const { categoryId } = useParams();
  const [sortValue, setSortValue] = useState(0);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({});
  const [filteredList, setFilteredList] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);

  const toggleFilter = () => {
    setFilterOpen((prev) => !prev);
  };
  const resetFilter = () => {
    setSelectedFilter({});
    setFilteredList(data);
    setActiveFilter(null);
  };
  const sortOptions = [
    { value: 0, label: 'від дешевих до дорогих', labelMobile: 'Дешеві' },
    { value: 1, label: 'від дорогих до дешевих', labelMobile: 'Дорогі' },
  ];
  const sortedData = useMemo(() => {
    const sortedAsc = filteredList?.toSorted(
      (a, b) => a.priceWithDiscount - b.priceWithDiscount,
    );
    return sortValue === 0 ? sortedAsc : sortedAsc.toReversed();
  }, [sortValue, filteredList]);
  const [initialFilterData, setInitialFilterData] = useState({
    priceFrom: 0,
    priceTo: 999,
    discount: false,
    types: [],
    colors: [],
    sizes: [],
    category: [],
  });
  const getFilterData = useCallback(async () => {
    if (categoryId === 'discounted') {
      const result = await GetFiltersForDiscounted(categoryId);
      const minMaxPrice = await GetPricesForDiscounted();
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
        const filterName =
          key === 'Category' ? 'categories' : key.toLowerCase() + 's';
        setInitialFilterData((prev) => ({
          ...prev,
          [filterName]: filterOptions,
        }));
      }
    } else {
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
    }
  }, [categoryId, setInitialFilterData]);

  const getFilteredData = useCallback(
    async (selected) => {
      try {
        if (Object.keys(selected).length > 0) {
          const data = await GetProductsFilter({
            page: currentPage,
            size: 30,
            categories:
              categoryId !== 'discounted' ? categoryId : selected.categories,
            discount: categoryId === 'discounted' || selected.discount,
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

  useEffect(() => {
    getFilterData();
  }, [getFilterData]);
  useEffect(() => {
    setFilteredList(data);
  }, [data]);

  useEffect(() => {
    if (Object.keys(selectedFilter).length > 0) {
      const timeoutId = setTimeout(() => {
        getFilteredData(selectedFilter);
      }, 4500);

      return () => clearTimeout(timeoutId);
    } else {
      setFilteredList(data);
      setActiveFilter(null);
    }
  }, [data, getFilteredData, selectedFilter]);

  return (
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
  );
};

export default ProductList;
