import React, { memo, useState } from 'react';
import styles from './InputSearch.module.scss';

import { useWindowSize } from '../../../../../hooks/useWindowSize';

import { ICONS } from '../../../icons';
import IconButton from '../../IconButton';

const InputSearch = memo(({ search, changeInput, clearInput }) => {
  const [isFocused, setIsFocused] = useState(false);

  const { width } = useWindowSize();

  return (
    <div className={styles.root}>
      {width <= 414 ? (
        <IconButton icon={<ICONS.back />} />
      ) : (
        <ICONS.search
          className={search || isFocused ? styles.iconGreen : null}
        />
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
