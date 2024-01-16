/* eslint-disable max-len */
import React, { Fragment, useState } from 'react';
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
import { useWindowSize } from '../../../hooks/useWindowSize';

const FilterSidebar = ({
  visibility,
  onClose,
  data,
  setData,
  selectedFilter,
  handleFilter,
  resetFilter,
  btnVisibility,
  setBtnVisibility,
}) => {
  const { priceFrom, priceTo } = data;
  const [displayButtonPossition, setDisplayPossition] = useState(0);
  const { width } = useWindowSize();
  const filterOn = Object.keys(selectedFilter).length > 0;

  const onDiscountChange = (event) => {
    const { checked } = event.target;
    const { layerY } = event.nativeEvent;
    setBtnVisibility(true);
    setDisplayPossition(layerY - 15);

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
    setBtnVisibility(true);
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
    const { offsetTop } = e.target;
    setDisplayPossition(offsetTop);
    setBtnVisibility(true);
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
  const handleSliderBlur = (e) => {
    const { offsetTop } = e.target;
    setBtnVisibility(true);
    setDisplayPossition(offsetTop + 35);
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
                handleInputChange={(e) => changePrice(e, 'priceTo')}
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
                handleBlur={handleSliderBlur}
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
            if (key === 'types') {
              title = 'Тип квітів';
            } else if (key === 'colors') {
              title = 'Колір';
            } else if (key === 'sizes') {
              title = 'Висота букета';
            }
            return (
              <Fragment key={key}>
                {value.length > 0 && title !== '' ? (
                  <div
                    onChange={(e) => {
                      const { layerY } = e.nativeEvent;

                      setDisplayPossition(layerY - 15);
                    }}
                  >
                    <DropDownList
                      selectedFilter={selectedFilter}
                      title={title}
                      data={value}
                      onChange={handleCheckboxChange}
                      filterName={key}
                    />
                    <Divider />
                  </div>
                ) : null}
              </Fragment>
            );
          })}
        </div>
        {width > 1200 && btnVisibility && filterOn && (
          <div
            style={{ top: displayButtonPossition }}
            className={`${styles.buttonContainer} ${styles.desktopButton}`}
          >
            <ICONS.btnPointer />
            <Button
              label={'Показати товари'}
              padding={true}
              onClick={() => handleFilter(selectedFilter)}
            />
          </div>
        )}
        <div className={`${styles.buttonContainer} ${styles.mobileButton}`}>
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
