/* eslint-disable max-len */
import React, { Fragment } from 'react';
import styles from './FilterSidebar.module.scss';
import { ICONS } from '../../ui-kit/icons';
import DropDownList from '../../ui-kit/components/DropDownList';
import RangeSlider from '../../ui-kit/components/RangeSlider';
import Divider from '../../ui-kit/components/Divider';
import Checkbox from '../../ui-kit/components/Checkbox';
import InputPrice from '../../ui-kit/components/Input/InputPrice';
import FilterShowbar from './FilterShowbar';
import Button from '../../ui-kit/components/Button';

const FilterSidebar = ({
  visibility,
  onClose,
  data,
  setData,
  selectedFilter,
}) => {
  const { priceFrom, priceTo } = data;

  const filterOn = Object.keys(selectedFilter).length > 0;

  const onDiscountChange = (event) => {
    const { checked } = event.target;

    setData((prev) => {
      if (checked) {
        return { ...prev, discounted: checked };
      } else {
        // eslint-disable-next-line no-unused-vars
        const { discounted, ...rest } = prev;
        return rest;
      }
    });
  };

  const handleCheckboxChange = (e, option, filterName) => {
    const { checked } = e.target;

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

  const changePrice = (e, price) => {
    setData((prev) => {
      return { ...prev, [price]: e.target.value };
    });
  };
  const handleSliderChange = (e) => {
    const price = {};
    if (priceFrom !== e[0]) {
      price.priceFrom = e[0];
    }

    if (priceTo !== e[1]) {
      price.priceTo = e[1];
    }

    setData((prev) => ({ ...prev, ...price }));
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
          {filterOn && (
            <Button
              label={'Скинути фільтри'}
              variant={'no-border-yellow'}
              className={styles.cancelFilter}
            />
          )}
        </div>

        <div className={styles.contentContainer}>
          <div className={styles.showbarContainer}>
            {filterOn && <FilterShowbar data={data} setData={setData} />}
          </div>
          <DropDownList title={'Ціна, діапазон'}>
            <div className={styles.displayPrice}>
              <InputPrice
                value={
                  selectedFilter.priceFrom
                    ? selectedFilter.priceFrom
                    : priceFrom
                }
                handleInputChange={(e) => changePrice(e, 'priceFrom')}
                index={0}
              />
              <ICONS.dash className={styles.priceDevider} />
              <InputPrice
                value={
                  selectedFilter.priceTo ? selectedFilter.priceTo : priceTo
                }
                handleInputChange={(e) => changePrice(e, 'priceFrom')}
                index={1}
              />
            </div>
            <div className={styles.rangeContainer}>
              <RangeSlider
                min={selectedFilter.priceFrom}
                max={selectedFilter.priceTo}
                initialMinPrice={priceFrom}
                initialMaxPrice={priceTo}
                handleSliderChange={handleSliderChange}
              />
            </div>
            <Checkbox
              label={'Акційна ціна'}
              checked={selectedFilter?.discounted || false}
              onChange={onDiscountChange}
            />
          </DropDownList>

          <Divider />
          {Object.entries(data)?.map(([key, value]) => {
            let title = '';
            if (key === 'type') {
              title = 'Тип квітів';
            } else if (key === 'color') {
              title = 'Колір';
            } else if (key === 'size') {
              title = 'Висота букета';
            }
            return (
              <Fragment key={key}>
                {value.length > 0 && title !== '' ? (
                  <>
                    <DropDownList
                      selectedFilter={selectedFilter}
                      title={title}
                      data={value}
                      onChange={handleCheckboxChange}
                      filterName={key}
                    />
                    <Divider />
                  </>
                ) : null}
              </Fragment>
            );
          })}
        </div>
        <div className={styles.buttonContainer}>
          <Button label={'Закрити'} padding={true} onClick={onClose} />
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
