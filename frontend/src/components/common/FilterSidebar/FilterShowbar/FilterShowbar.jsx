import React from 'react';
import styles from './FilterShowbar.module.scss';
import Filter from '../../../ui-kit/components/Filter';

export const FilterShowbar = ({ data, setData }) => {
  const selected =
    Object.entries(data).map(([key, value]) => {
      if (key === 'maxPrice' || key === 'minPrice' || key === 'discounted') {
        return value;
      }
      return {
        [key]: value.filter((item) => item.checked),
      };
    }) || [];

  return (
    <>
      <div className={styles.filterShowbar}>
        <span className={styles.title}>Ви вибрали:</span>
        {selected.map((filter) => {
          return Object.entries(filter).map(([key, value]) => {
            const filterType =
              key === 'type'
                ? 'Вид'
                : key === 'size'
                ? 'Розмір'
                : key === 'color'
                ? 'Колір'
                : '';

            if (value.length === 0 || key === 'price') {
              return null;
            }
            if (key === 'discounted' && value) {
              return (
                <Filter
                  key={key}
                  label={'Акційна ціна'}
                  onClick={setData}
                  filterName={key}
                />
              );
            }

            return (
              filterType !== '' &&
              value.map((selected) => (
                <Filter
                  key={selected.name}
                  label={`${filterType}: ${selected.name}`}
                  id={selected.id}
                  onClick={setData}
                  filterName={key}
                />
              ))
            );
          });
        })}
      </div>
    </>
  );
};

export default FilterShowbar;
