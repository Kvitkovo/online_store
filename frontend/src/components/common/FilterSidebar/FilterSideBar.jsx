/* eslint-disable max-len */
import React, { useEffect, useState, useCallback, Fragment } from 'react';
import styles from './FilterSidebar.module.scss';
import { ICONS } from '../../ui-kit/icons';
import DropDownList from '../../ui-kit/components/DropDownList';
import RangeSlider from '../../ui-kit/components/RangeSlider';
import Divider from '../../ui-kit/components/Divider';
import {
  GetFiltersInCategory,
  GetMinMaxPrice,
} from '../../../services/catalog/categoryAccess.service';
import Checkbox from '../../ui-kit/components/Checkbox';
import InputPrice from '../../ui-kit/components/Input/InputPrice';
import FilterShowbar from './FilterShowbar';
import Button from '../../ui-kit/components/Button';

const FilterSidebar = ({ visibility, onClose, categoryId, data, setData }) => {
  const { minPrice, maxPrice, discounted } = data;

  const [dataLoaded, setDataLoaded] = useState(false);
  const [filterOn, setFilterOn] = useState(false);

  const onDiscountChange = (event) => {
    setData((prev) => ({ ...prev, discounted: event.target.checked }));
  };

  const handleCheckboxChange = (e, option, filterName) => {
    const { checked } = e.target;

    setData((prev) => {
      const settedData = prev[filterName].map((item) => {
        if (item.id === option.id) {
          item.checked = checked;
        }
        return item;
      });

      return { ...prev, [filterName]: settedData };
    });

    if (checked) {
      setFilterOn(true);
    }
  };

  const changeStartPrice = (e) => {
    setData((prev) => {
      return { ...prev, minPrice: e.target.value };
    });
  };
  const changeEndPrice = (e) => {
    setData((prev) => {
      return { ...prev, maxPrice: e.target.value };
    });
  };
  const handleSliderChange = (e) => {
    setData((prev) => ({ ...prev, minPrice: e[0], maxPrice: e[1] }));
  };

  const getFilterData = useCallback(async () => {
    const result = await GetFiltersInCategory(categoryId);
    const minMaxPrice = await GetMinMaxPrice({ categoryId: categoryId });
    setData((prev) => ({
      ...prev,
      ...minMaxPrice,
    }));

    for (const [key, value] of Object.entries(result)) {
      const filterOptions = Object.entries(value).map(([key, value]) => ({
        id: key,
        name: value,
        checked: false,
      }));
      setData((prev) => ({
        ...prev,
        [key.toLowerCase()]: filterOptions,
      }));
    }
    setDataLoaded(true);
  }, [categoryId, setData]);

  useEffect(() => {
    getFilterData();
  }, [getFilterData]);

  return (
    <>
      {dataLoaded && (
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
                  value={minPrice}
                  handleInputChange={changeStartPrice}
                  index={0}
                />
                <ICONS.dash className={styles.priceDevider} />
                <InputPrice
                  value={maxPrice}
                  handleInputChange={changeEndPrice}
                  index={1}
                />
              </div>
              <div className={styles.rangeContainer}>
                <RangeSlider
                  inputValues={[minPrice, maxPrice]}
                  handleSliderChange={handleSliderChange}
                />
              </div>
              <Checkbox
                label={'Акційна ціна'}
                checked={discounted}
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
      )}
    </>
  );
};

export default FilterSidebar;
