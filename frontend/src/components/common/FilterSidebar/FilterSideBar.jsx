import React, { useEffect, useState, useCallback } from 'react';
import styles from './FilterSidebar.module.scss';
import { ICONS } from '../../ui-kit/icons';
import DropDownList from '../../ui-kit/components/DropDownList';
import RangeSlider from '../../ui-kit/components/RangeSlider';
import Divider from '../../ui-kit/components/Divider';
import {
  GetColors,
  GetProductTypes,
  GetSizes,
} from '../../../services/catalog/categoryAccess.service';
import Checkbox from '../../ui-kit/components/Checkbox';
import InputPrice from '../../ui-kit/components/Input/InputPrice';

const FilterSidebar = ({ visibility }) => {
  const [price, setPrice] = useState([99, 99999]);
  const [productTypes, setProductTypes] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(false);
  const [colorsCollection, setColorsCollection] = useState(null);
  const [bouquetSizes, setBouquetSizes] = useState(null);

  const changeStartPrice = (e) => {
    setPrice((prev) => [e.target.value, prev[1]]);
  };
  const changeEndPrice = (e) => {
    setPrice((prev) => [prev[0], e.target.value]);
  };
  const handleSliderChange = (e) => {
    setPrice(e);
  };

  const getFilterData = useCallback(async (fetchFunc, settingFunc) => {
    const result = await fetchFunc();
    const addCheckedField = result.map((item) => {
      item.checked = false;
      return item;
    });

    settingFunc(addCheckedField);
  }, []);

  useEffect(() => {
    getFilterData(GetColors, setColorsCollection);
    getFilterData(GetProductTypes, setProductTypes);
    getFilterData(GetSizes, setBouquetSizes);
  }, [getFilterData]);

  return (
    <div
      className={`
        ${styles.filterContainer} 
        ${visibility ? styles.filterVisible : styles.filterHidden}`}
    >
      <h3 className={styles.filterTitle}>Фільтр</h3>
      <DropDownList title={'Ціна, діапазон'}>
        <div className={styles.displayPrice}>
          <InputPrice
            value={price[0]}
            handleInputChange={changeStartPrice}
            index={0}
          />
          <ICONS.dash className={styles.priceDevider} />
          <InputPrice
            value={price[1]}
            handleInputChange={changeEndPrice}
            index={1}
          />
        </div>
        <div className={styles.rangeContainer}>
          <RangeSlider
            inputValues={price}
            handleSliderChange={handleSliderChange}
          />
        </div>
        <Checkbox
          label={'Акційна ціна'}
          checked={discountPrice}
          onChange={(event) => setDiscountPrice(event.target.checked)}
        />
      </DropDownList>

      <Divider />

      <DropDownList
        title={'Тип квітів'}
        data={productTypes}
        setData={setProductTypes}
      />

      <Divider />

      <DropDownList
        title={'Колір'}
        data={colorsCollection}
        setData={setColorsCollection}
      />

      <Divider />

      <DropDownList
        title={'Висота букета'}
        data={bouquetSizes}
        setData={setBouquetSizes}
      />

      <Divider />
    </div>
  );
};

export default FilterSidebar;
