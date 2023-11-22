import React, { useState } from 'react';
import { ICONS } from '../../icons';
import styles from './DropDownList.module.scss';

const DropDownList = ({ title, children, data, setData }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleCheckboxChange = (e, updatingFunction, option) => {
    updatingFunction((prev) =>
      prev.map((item) => {
        if (item.id === option.id) {
          item.checked = e.target.checked;
        }
        return item;
      }),
    );
  };

  return (
    <div>
      <div className={styles.dropdown}>
        <div className={styles.dropdownTitle} onClick={handleClick}>
          {open ? (
            <ICONS.arrowUp className={styles.dropdownIcon} />
          ) : (
            <ICONS.showList className={styles.dropdownIcon} />
          )}
          <span>{title}</span>
        </div>

        {open && children}
        {open && data && (
          <ul className={styles.listData}>
            {data.map((option) => (
              <li key={option.id} className={styles.listItem}>
                <input
                  type="checkbox"
                  checked={option.checked}
                  className={styles.checkbox}
                  onChange={(event) =>
                    handleCheckboxChange(event, setData, option)
                  }
                />
                <span>{option.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DropDownList;
