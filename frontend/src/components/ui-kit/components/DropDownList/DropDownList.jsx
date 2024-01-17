import React, { useState } from 'react';
import { ICONS } from '../../icons';
import styles from './DropDownList.module.scss';
import Checkbox from '../Checkbox/Checkbox';
import PointerButton from '../PointerButton/PointerButton';

const DropDownList = ({
  title,
  children,
  data,
  onChange,
  filterName,
  selectedFilter,
  activeFilter,
  handleFilter,
}) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownTitle} onClick={handleClick}>
        {open ? (
          <ICONS.showList className={styles.dropdownIcon} />
        ) : (
          <ICONS.hideList className={styles.dropdownIcon} />
        )}
        <span>{title}</span>
      </div>

      {open && children}
      {open && data && (
        <ul className={styles.listData}>
          {data.map((option) => (
            <li key={option.id} className={styles.listItem}>
              <Checkbox
                label={option.name}
                checked={selectedFilter[filterName]?.some(
                  (filter) => filter === option.id,
                )}
                onChange={(event) => onChange(event, option, filterName)}
              />
              {activeFilter === option.name && (
                <PointerButton
                  handleFilter={() => handleFilter(selectedFilter)}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDownList;
