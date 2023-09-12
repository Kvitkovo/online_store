import React, { useState, memo } from 'react';
import styles from './InputSearch.module.scss';

import useIsMobile from '../../../../../hooks/useIsMobile';

import { ICONS } from '../../../icons';
import IconButton from '../../IconButton';

const InputSearch = memo(({ search, changeInput, clearInput }) => {
  const [isFocused, setIsFocused] = useState(false);

  const isSmallScreen = useIsMobile('(max-width: 412px)');

  return (
    <div className={styles.root}>
      {isSmallScreen ? (
        <IconButton icon={<ICONS.back />} />
      ) : isFocused ? (
        <ICONS.searchGreen />
      ) : (
        <ICONS.search />
      )}
      {search && (
        <div className={styles.clearBtn}>
          <IconButton onClick={clearInput} icon={<ICONS.CloseIcon />} />
        </div>
      )}
      <input
        className={styles.input}
        type="text"
        placeholder="Пошук"
        value={search}
        onChange={changeInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
});

export default InputSearch;
