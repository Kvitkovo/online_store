import React, { useState, useEffect, memo } from 'react';
import styles from './InputSearch.module.scss';

import { ICONS } from '../../../icons';
import IconButton from '../../IconButton';

const InputSearch = memo(({ search, setSearch }) => {
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

  return (
    <div className={styles.root}>
      {smallScreen ? (
        <IconButton icon={<ICONS.back />} />
      ) : isFocused ? (
        <ICONS.searchGreen />
      ) : (
        <ICONS.search />
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
});

export default InputSearch;
