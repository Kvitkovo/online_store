/* eslint-disable max-len */
import React, { useState, useEffect, useCallback } from 'react';
import styles from './ProductList.module.scss';
import Select from '../../ui-kit/components/Select';
import Button from '../../ui-kit/components/Button';
import { ICONS } from '../../ui-kit/icons';
import DropDown from '../../ui-kit/components/DropDown';
import FilterShowbar from '../FilterSidebar/FilterShowbar';
import FilterSidebar from '../FilterSidebar';
import { GetProductsFilter } from '../../../services/products/productsAccess.service';
import {
  GetFiltersInCategory,
  GetFiltersForDiscounted,
} from '../../../services/catalog/categoryAccess.service';
import { useParams } from 'react-router-dom';
import Card from '../Card';
import Pagination from '../../ui-kit/components/Pagination';

const ProductList = ({
  data,
  setCurrentPage,
  currentPage = 1,
  isLoading = false,
  totalAmount,
  sortValue,
  setSortValue,
  query = '',
}) => {
  const { categoryId } = useParams();
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
    const result =
      categoryId === 'discounted'
        ? await GetFiltersForDiscounted(categoryId)
        : await GetFiltersInCategory(categoryId);
    for (const [key, value] of Object.entries(result)) {
      const filterOptions = Object.entries(value).map(([id, name]) => {
        const keyMappings = {
          Sizes: 'sizeId',
          Types: 'productTypeId',
          Colors: 'colorId',
        };
        const getKeyMapping = (key) => keyMappings[key] || 'categoryId';

        const filter = getKeyMapping(key) || 'categoryId';

        if (query === '') {
          return {
            id: id,
            name: name,
          };
        }
        if (query !== '' && data?.some((item) => item[filter] === +id)) {
          return {
            id: id,
            name: name,
          };
        } else {
          return;
        }
      });
      const filterName = key.toLowerCase();
      if (key === 'Prices') {
        const prices = Object.values(value);
        setInitialFilterData((prev) => ({
          ...prev,
          priceFrom: prices[0],
          priceTo: prices[1],
        }));
      } else {
        setInitialFilterData((prev) => {
          return {
            ...prev,
            [filterName]: filterOptions.filter(
              (filter) => typeof filter === 'object',
            ),
          };
        });
      }
    }
  }, [categoryId, data, query]);

  const getFilteredData = useCallback(
    async (selected) => {
      try {
        if (Object.keys(selected).length > 0) {
          const data = await GetProductsFilter({
            page: currentPage,
            size: 12,
            categories:
              categoryId !== 'discounted' ? categoryId : selected.categories,
            discount: categoryId === 'discounted' || selected.discount,
            ...selected,
            sortDirection: sortValue === 0 ? 'ASC' : 'DESC',
            title: query,
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
    [categoryId, currentPage, query, sortValue],
  );

  useEffect(() => {
    getFilterData();
    return () => {
      setInitialFilterData({});
      setActiveFilter(null);
    };
  }, [getFilterData]);
  useEffect(() => {
    setFilteredList(data);
  }, [data]);

  useEffect(() => {
    if (Object.keys(selectedFilter).length > 0) {
      const timeoutId = setTimeout(() => {
        getFilteredData(selectedFilter);
      }, 5500);

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
          filteredData={filteredList}
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
          : filteredList && (
              <>
                <div className={styles.cards}>
                  {filteredList.map((product) => (
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
                  totalCount={activeFilter ? filteredList.length : totalAmount}
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
