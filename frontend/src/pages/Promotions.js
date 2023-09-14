import React, { useState } from 'react';
import InputSearch from '../components/ui-kit/components/Input/InputSearch';

function Promotions() {
  //inputSearch
  const [search, setSearch] = useState('');

  const changeInput = (e) => {
    setSearch(e.target.value);
  };
  const clearInput = () => {
    setSearch('');
  };
  return (
    <div>
      <h1>Promotions</h1>
      <InputSearch
        search={search}
        changeInput={changeInput}
        clearInput={clearInput}
      />
    </div>
  );
}
export default Promotions;
