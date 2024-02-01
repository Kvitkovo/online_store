import React, { memo, useState, useEffect } from 'react';
import styles from './InputSearch.module.scss';

import { useWindowSize } from '../../../../../hooks/useWindowSize';

import { ICONS } from '../../../icons';
import IconButton from '../../IconButton';
// eslint-disable-next-line max-len
import { GetProductsFilter } from '../../../../../services/products/productsAccess.service';
import Divider from '../../Divider';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../Button';

const InputSearch = memo(({ isActive, setActive }) => {
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const { width } = useWindowSize();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState(null);
  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const showResults = () => {
    const link = `search/${query}`;
    setQuery('');
    if (setActive) {
      setActive(false);
    }
    navigate(link);
  };
  const handleFocus = () => {
    setIsFocused(true);
    if (setActive) {
      setActive(true);
    }
  };
  const handleBlur = () => {
    setIsFocused(false);
    if (setActive) {
      setActive(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        if (query.length >= 4) {
          const data = await GetProductsFilter({
            size: 3,
            sortDirection: 'ASC',
            title: query,
          });
          setSuggestions(
            data.content.map((suggestion) => {
              const { id, title } = suggestion;

              return { id, title };
            }),
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [query]);

  const highlightWord = (name) => {
    const lowerCaseName = name.toLowerCase();
    const indexOfTerm = lowerCaseName.indexOf(query.toLowerCase());

    if (indexOfTerm !== -1) {
      const beforeTerm = name.slice(0, indexOfTerm);
      const term = name.slice(indexOfTerm, indexOfTerm + query.length);
      const afterTerm = name.slice(indexOfTerm + query.length);

      return (
        <>
          {beforeTerm}
          <span className={styles.highlightWord}>{term}</span>
          {afterTerm}
        </>
      );
    }

    return name;
  };
  const handleGoToProduct = () => {
    setSuggestions(null);
    setQuery('');
    setActive(false);
  };
  const goBack = () => {
    setActive(false);
    setQuery('');
  };
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
    }
    return () => (document.body.style.overflow = 'unset');
  }, [isActive]);
  return (
    <div className={styles.overlayActive}>
      {(width > 510 || isActive) && (
        <div className={styles.root}>
          {width <= 510 ? (
            <div
              className={`${
                query || isFocused ? styles.iconGreen : styles.icon
              } ${styles.backBtn}`}
            >
              <IconButton icon={<ICONS.back />} onClick={goBack} />
            </div>
          ) : (
            <ICONS.search
              className={query || isFocused ? styles.iconGreen : styles.icon}
            />
          )}
          {query && (
            <div className={styles.clearBtn}>
              <IconButton
                onClick={handleGoToProduct}
                icon={<ICONS.CloseIcon />}
              />
            </div>
          )}
          {width <= 510 && !query && (
            <ICONS.search
              className={`${styles.icon} ${styles.mobileIcon} ${
                isFocused && styles.iconGreen
              }`}
            />
          )}
          <input
            className={styles.input}
            type="text"
            placeholder="Пошук"
            value={query}
            onChange={handleSearch}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <ul
            className={`${styles.suggestions} ${
              query.length >= 4 ? styles.visible : ''
            }`}
          >
            <li className={styles.searchResults}>
              <Button
                label="Всі рeзультати пошуку"
                variant="no-border"
                icon={<ICONS.hideList />}
                onClick={showResults}
                tabIndex={-1}
              />
              <Divider />
            </li>
            {suggestions?.length > 0 &&
              suggestions.map((suggestion) => (
                <li key={suggestion.id} className={styles.suggestion}>
                  <Link
                    to={`/product/${suggestion.id}`}
                    className={styles.link}
                    onClick={handleGoToProduct}
                  >
                    {highlightWord(suggestion.title)}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default InputSearch;
