/* eslint-disable max-len */
import React, { Fragment, useMemo } from 'react';
import styles from './FilterSidebar.module.scss';
import { ICONS } from '../../ui-kit/icons';
import DropDownList from '../../ui-kit/components/DropDownList';
import RangeSlider from '../../ui-kit/components/RangeSlider';
import Divider from '../../ui-kit/components/Divider';
import Checkbox from '../../ui-kit/components/Checkbox';
import InputPrice from '../../ui-kit/components/Input/InputPrice';
import FilterShowbar from './FilterShowbar';
import Button from '../../ui-kit/components/Button';
import IconButton from '../../ui-kit/components/IconButton';
import PointerButton from '../../ui-kit/components/PointerButton';
import { useParams } from 'react-router-dom';

const FilterSidebar = ({
  visibility,
  onClose,
  data,
  setData,
  selectedFilter,
  handleFilter,
  resetFilter,
  setActiveFilter,
  activeFilter,
}) => {
  const { categoryId } = useParams();
  const { priceFrom, priceTo } = data;
  const filterOn = Object.keys(selectedFilter).length > 0;
  const maxPrice = useMemo(
    () => (selectedFilter.priceTo ? selectedFilter.priceTo : priceTo),
    [priceTo, selectedFilter.priceTo],
  );
  const minPrice = useMemo(
    () => (selectedFilter.priceFrom ? selectedFilter.priceFrom : priceFrom),
    [priceFrom, selectedFilter.priceFrom],
  );

  const handleDiscountChange = (event) => {
    const { checked } = event.target;
    setActiveFilter('discount');

    setData((prev) => {
      if (checked) {
        return { ...prev, discount: checked };
      } else {
        // eslint-disable-next-line no-unused-vars
        const { discount, ...rest } = prev;
        return rest;
      }
    });
  };

  const handleCheckboxChange = (e, option, filterName) => {
    const { checked } = e.target;
    setActiveFilter(option.name);
    setData((prev) => {
      let settedData;
      if (checked) {
        settedData = prev[filterName]
          ? [...prev[filterName], option.id]
          : [option.id];
      } else {
        settedData = prev[filterName].filter((item) => item !== option.id);
        if (settedData.length === 0) {
          const clearedFilter = { ...prev };

          delete clearedFilter[filterName];
          return clearedFilter;
        }
      }
      return { ...prev, [filterName]: settedData };
    });
  };

  const setPrice = (initialvalue, type, newValue) => {
    if (initialvalue !== newValue) {
      setData((prev) => ({ ...prev, [type]: newValue }));
      setActiveFilter('price');
    } else {
      setData((prev) => {
        const dataCopy = { ...prev };
        delete dataCopy[type];
        return dataCopy;
      });
    }
  };

  const handleSliderChange = (e) => {
    setPrice(priceFrom, 'priceFrom', e[0]);
    setPrice(priceTo, 'priceTo', e[1]);
  };

  return (
    <>
      <div
        className={`
        ${styles.filterContainer} 
        ${visibility ? styles.filterVisible : styles.filterHidden}`}
      >
        <div className={styles.titleContainer}>
          <h3 className={styles.filterTitle}>Фільтр</h3>
          <IconButton
            icon={<ICONS.CloseIcon />}
            variant="secondary"
            onClick={onClose}
          />
        </div>

        <div className={styles.contentContainer}>
          <div className={styles.showbarContainer}>
            {filterOn && (
              <>
                <FilterShowbar
                  selected={selectedFilter}
                  data={data}
                  setData={setData}
                  handleFilter={handleFilter}
                />
                <Button
                  label={'Скинути фільтри'}
                  variant={'no-border-yellow'}
                  className={styles.cancelFilter}
                  onClick={resetFilter}
                />
              </>
            )}
          </div>
          <DropDownList title={'Ціна, діапазон'}>
            <div className={styles.displayPrice}>
              <InputPrice
                value={minPrice}
                minValue={priceFrom}
                maxValue={maxPrice}
                handleInputChange={(e) =>
                  setPrice(priceFrom, 'priceFrom', +e.target.value)
                }
                index={0}
              />
              <ICONS.dash className={styles.priceDevider} />
              <InputPrice
                value={maxPrice}
                minValue={minPrice}
                maxValue={priceTo}
                handleInputChange={(e) =>
                  setPrice(priceTo, 'priceTo', +e.target.value)
                }
                index={1}
              />
            </div>
            <div className={styles.rangeContainer}>
              {activeFilter === 'price' && (
                <PointerButton
                  handleFilter={() => handleFilter(selectedFilter)}
                />
              )}
              <RangeSlider
                min={selectedFilter.priceFrom}
                max={selectedFilter.priceTo}
                initialMinPrice={priceFrom}
                initialMaxPrice={priceTo}
                handleSliderChange={handleSliderChange}
              />
            </div>
            {categoryId !== 'discounted' && (
              <div className={styles.discounted}>
                <Checkbox
                  label={'Акційна ціна'}
                  checked={selectedFilter?.discount}
                  onChange={handleDiscountChange}
                />
                {activeFilter === 'discount' && (
                  <PointerButton
                    handleFilter={() => handleFilter(selectedFilter)}
                  />
                )}
              </div>
            )}
          </DropDownList>

          <Divider />
          {Object.entries(data)?.map(([key, value]) => {
            const titleMapping = {
              types: 'Тип квітів',
              colors: 'Колір',
              sizes: 'Висота букета',
              categories: 'Категорії',
            };
            const title = titleMapping[key] || '';

            return (
              <Fragment key={key}>
                {value.length > 0 && title !== '' ? (
                  <div>
                    <DropDownList
                      selectedFilter={selectedFilter}
                      title={title}
                      data={value}
                      onChange={handleCheckboxChange}
                      filterName={key}
                      activeFilter={activeFilter}
                      handleFilter={handleFilter}
                    />
                    <Divider />
                  </div>
                ) : null}
              </Fragment>
            );
          })}
        </div>
        <div className={styles.mobileButton}>
          <Button
            label={'Показати товари'}
            padding={true}
            onClick={() => handleFilter(selectedFilter)}
            disabled={!filterOn}
          />
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
