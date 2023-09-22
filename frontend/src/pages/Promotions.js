import React, { useState } from 'react';
import Select from '../components/ui-kit/components/Select';
import InputSearch from '../components/ui-kit/components/Input/InputSearch';
import InputPrice from '../components/ui-kit/components/Input/InputPrice';
import RangeSlider from '../components/ui-kit/components/RangeSlider';
import Pagination from '../components/ui-kit/components/Pagination';

import { ICONS } from '../components/ui-kit/icons';
import '../scss/Promotions.scss';

function Promotions() {
  // inputSearch
  const [search, setSearch] = useState('');

  const changeInput = (e) => {
    setSearch(e.target.value);
  };

  const clearInput = () => {
    setSearch('');
  };

  // inputPrice
  const [inputValues, setInputValues] = useState([99, 99999]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const index = name === 'input1' ? 0 : 1;

    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const handleSliderChange = (values) => {
    setInputValues(values);
  };

  // select
  const [value, setValue] = useState('fromCheapToExpensive');

  const options = [
    { value: 'fromExpensiveToCheap', label: 'від дорогих до дешевих' },
    { value: 'fromCheapToExpensive', label: 'від дешевих до дорогих' },
  ];

  // pagination
  const PageSize = 11;
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div>
      <h1>Promotions</h1>
      <InputSearch
        search={search}
        changeInput={changeInput}
        clearInput={clearInput}
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
      <Select value={value} setValue={setValue} options={options} />
      <Pagination
        currentPage={currentPage}
        totalCount={99}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default Promotions;
