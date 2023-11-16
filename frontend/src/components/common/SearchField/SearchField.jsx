import React, { useState } from 'react';
import InputSearch from '../../ui-kit/components/Input/InputSearch';

const SearchField = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (event) => {
    const userInput = event.target.value;
    const allowedLetters = /^[\u0400-\u04FF\u0500-\u052F\u0600-\u06FF]+$/;
    if (allowedLetters.test(userInput)) {
      setSearchQuery(userInput);
    } else if (userInput === '') {
      setSearchQuery(userInput);
    }
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const clearSearchInput = () => {
    setSearchQuery('');
  };

  return (
    <InputSearch
      search={searchQuery}
      changeInput={handleSearchInputChange}
      clearInput={clearSearchInput}
      onSearch={handleSearch}
    />
  );
};

export default SearchField;
