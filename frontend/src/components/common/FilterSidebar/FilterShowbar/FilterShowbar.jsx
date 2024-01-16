import React, { useCallback } from 'react';
import styles from './FilterShowbar.module.scss';
import Filter from '../../../ui-kit/components/Filter';

export const FilterShowbar = ({ data, setData, selected, handleFilter }) => {
  const handleReset = useCallback(
    (filterName, id) => {
      setData((prev) => {
        const clearedFilter = { ...prev };

        const remainingOptions = Array.isArray(prev[filterName])
          ? prev[filterName]?.filter((item) => item !== id)
          : [];
        if (
          remainingOptions.length === 0 ||
          filterName === 'priceFrom' ||
          filterName === 'priceTo' ||
          filterName === 'discounted'
        ) {
          delete clearedFilter[filterName];
          handleFilter(clearedFilter);
          return clearedFilter;
        }
        const newData = { ...prev, [filterName]: remainingOptions };
        handleFilter(newData);
        return newData;
      });
    },
    [handleFilter, setData],
  );

  return (
    <>
      <div className={styles.filterShowbar}>
        <span className={styles.title}>Ви вибрали:</span>
        {selected &&
          Object.entries(selected).map(([key, value]) => {
            const filterType =
              key === 'types'
                ? 'Вид'
                : key === 'sizes'
                ? 'Розмір'
                : key === 'colors'
                ? 'Колір'
                : '';

            if (key === 'priceFrom') {
              return (
                <Filter
                  key={key}
                  label={`Ціна від ${selected.priceFrom}`}
                  onClick={handleReset}
                  filterName={key}
                />
              );
            }
            if (key === 'priceTo') {
              return (
                <Filter
                  key={key}
                  label={`Ціна до ${selected.priceTo}`}
                  onClick={handleReset}
                  filterName={key}
                />
              );
            }
            if (key === 'discounted' && value) {
              return (
                <Filter
                  key={key}
                  label={'Акційна ціна'}
                  onClick={handleReset}
                  filterName={key}
                />
              );
            }

            return (
              filterType !== '' &&
              value.map((selected) => {
                const name = data[key].find(
                  (field) => field.id === selected,
                ).name;

                return (
                  <Filter
                    key={name}
                    label={`${filterType}: ${name}`}
                    id={selected}
                    onClick={handleReset}
                    filterName={key}
                  />
                );
              })
            );
          })}
      </div>
    </>
  );
};

export default FilterShowbar;
