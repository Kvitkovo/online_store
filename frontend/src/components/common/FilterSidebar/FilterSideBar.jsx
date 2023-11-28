import React, { useEffect, useState, useCallback } from 'react';
import styles from './FilterSidebar.module.scss';
import { ICONS } from '../../ui-kit/icons';
import DropDownList from '../../ui-kit/components/DropDownList/DropDownList';
import RangeSlider from '../../ui-kit/components/RangeSlider';
import Devider from '../../ui-kit/components/Divider';
import {
  GetColors,
  GetProductTypes,
  GetSizes,
} from '../../../services/catalog/categoryAccess.service';
import Checkbox from '../../ui-kit/components/Checkbox/Checkbox';

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
          <input
            type="number"
            className={styles.price}
            value={price[0]}
            min={99}
            max={99999}
            onChange={changeStartPrice}
          />
          <ICONS.dash className={styles.priceDevider} />
          <input
            type="number"
            className={styles.price}
            value={price[1]}
            min={99}
            max={99999}
            onChange={changeEndPrice}
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

      <Devider />

      <DropDownList
        title={'Тип квітів'}
        data={productTypes}
        setData={setProductTypes}
      />

      <Devider />

      <DropDownList
        title={'Колір'}
        data={colorsCollection}
        setData={setColorsCollection}
      />

      <Devider />

      <DropDownList
        title={'Висота букета'}
        data={bouquetSizes}
        setData={setBouquetSizes}
      />

      <Devider />
    </div>
  );
};

export default FilterSidebar;
