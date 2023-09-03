import React, { useState } from 'react';
import InputSearch from '../components/ui-kit/components/Input/InputSearch';
import Pagination from '../components/ui-kit/components/Pagination';
import Select from '../components/ui-kit/components/Select';
import InputPrice from '../components/ui-kit/components/Input/InputPrice';
import RangeSlider from '../components/ui-kit/components/RangeSlider';

import '../scss/Shops.scss';

import { ICONS } from '../components/ui-kit/icons';

function Shops() {
  //inputSearch
  const [search, setSearch] = useState('');

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 9;

  // select
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('fromCheapToExpensive');

  const options = [
    { value: 'fromExpensiveToCheap', label: 'від дорогих до дешевих' },
    { value: 'fromCheapToExpensive', label: 'від дешевих до дорогих' },
  ];

  //inputPrice
  const [inputValues, setInputValues] = useState([99, 99999]);

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const handleSliderChange = (values) => {
    setInputValues(values);
  };

  return (
    <div>
      <h1>Shops</h1>
      <InputSearch search={search} setSearch={setSearch} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
      <Select
        open={open}
        setOpen={setOpen}
        value={value}
        setValue={setValue}
        options={options}
      />
      <div className="priceBlock">
        <div className="priceTop">
          <InputPrice
            value={inputValues[0]}
            handleInputChange={handleInputChange}
            index={0}
          />
          <ICONS.dash />
          <InputPrice
            value={inputValues[1]}
            handleInputChange={handleInputChange}
            index={1}
          />
        </div>
        <RangeSlider
          inputValues={inputValues}
          handleSliderChange={handleSliderChange}
        />
      </div>
    </div>
  );
}
export default Shops;
