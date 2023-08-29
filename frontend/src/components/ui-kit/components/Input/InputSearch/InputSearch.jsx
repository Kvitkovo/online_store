import React, { useState, useEffect } from 'react';
import styles from './InputSearch.module.scss';

import { ICONS } from '../../../icons';
import IconButton from '../../IconButton';

const InputSearch = () => {
  const [search, setSearch] = useState('');
  const [smallScreen, setSmallScreen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 375px)');

    const handleMediaChange = (event) => {
      setSmallScreen(event.matches);
    };
    mediaQuery.addListener(handleMediaChange);
    handleMediaChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaChange);
    };
  }, []);

  const iconColor = isFocused || search.length > 0 ? '#6CC25E' : '#242424';

  return (
    <div className={styles.root}>
      {smallScreen ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 12H5"
            stroke="#242424"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 19L5 12L12 5"
            stroke="#242424"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Icons">
            <path
              id="Vector"
              d="M11 19.5C15.4183 19.5 19 15.9183 19 11.5C19
                        7.08172 15.4183 3.5 11 3.5C6.58172 3.5 3 7.08172
                        3 11.5C3 15.9183 6.58172 19.5 11 19.5Z"
              stroke={iconColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="Vector_2"
              d="M21 21L16.65 16.65"
              stroke={iconColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      )}
      {search && (
        <div className={styles.clearBtn}>
          <IconButton
            onClick={() => setSearch('')}
            icon={<ICONS.CloseIcon />}
          />
        </div>
      )}
      <input
        className={styles.input}
        type="text"
        placeholder="Пошук"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

export default InputSearch;
