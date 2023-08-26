import React, { useCallback, useState, memo } from 'react';
import styles from './Checkbox.module.scss';
import Button from '../Button/Button';
import { ICONS } from '../../../ui-kit/icons';

const Checkbox = memo(({ label, checked, onChange }) => {
  return (
    <label>
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
});

const FlowerPicker = () => {
  const [selectedPromotion, setSelectedPromotion] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedHeight, setSelectedHeight] = useState([]);

  const [typesListVisible, setTypesListVisible] = useState(true);
  const [colorsListVisible, setColorsListVisible] = useState(true);
  const [heightListVisible, setHeightListVisible] = useState(true);

  const handlePromotion = useCallback(() => {
    setSelectedPromotion(!selectedPromotion);
  }, [selectedPromotion]);

  const handleTypeChange = useCallback((label) => {
    setSelectedTypes((prevSelectedTypes) => {
      if (prevSelectedTypes.includes(label)) {
        return prevSelectedTypes.filter((t) => t !== label);
      } else {
        return [...prevSelectedTypes, label];
      }
    });
  }, []);

  const handleColorChange = useCallback((label) => {
    setSelectedColors((prevSelectedColors) => {
      if (prevSelectedColors.includes(label)) {
        return prevSelectedColors.filter((c) => c !== label);
      } else {
        return [...prevSelectedColors, label];
      }
    });
  }, []);
  const handleHeightChange = useCallback((label) => {
    setSelectedHeight((prevSelectedHeight) => {
      if (prevSelectedHeight.includes(label)) {
        return prevSelectedHeight.filter((h) => h !== label);
      } else {
        return [...prevSelectedHeight, label];
      }
    });
  }, []);

  const handleRemoveType = (type) => {
    setSelectedTypes((prevSelectedTypes) =>
      prevSelectedTypes.filter((t) => t !== type),
    );
  };

  const handleRemoveColor = (color) => {
    setSelectedColors((prevSelectedColors) =>
      prevSelectedColors.filter((c) => c !== color),
    );
  };

  const handleRemoveHeight = (height) => {
    setSelectedHeight((prevSelectedHeight) =>
      prevSelectedHeight.filter((h) => h !== height),
    );
  };

  return (
    <div>
      <div className={styles.checkbox}>
        <Checkbox
          label="Акційна ціна"
          checked={selectedPromotion}
          onChange={handlePromotion}
        />
        <hr />
        <Button
          variant="no-border"
          label="Вид квітів"
          icon={typesListVisible ? <ICONS.showList /> : <ICONS.hideList />}
          onClick={() => setTypesListVisible(!typesListVisible)}
        />
        {typesListVisible && (
          <>
            {types.map((type) => (
              <Checkbox
                key={type}
                label={type}
                checked={selectedTypes.includes(type)}
                onChange={() => handleTypeChange(type)}
              />
            ))}
          </>
        )}
        <hr />
        <Button
          variant="no-border"
          label="Колір"
          icon={colorsListVisible ? <ICONS.showList /> : <ICONS.hideList />}
          onClick={() => setColorsListVisible(!colorsListVisible)}
        />
        {colorsListVisible && (
          <>
            {colors.map((color) => (
              <Checkbox
                key={color}
                label={color}
                checked={selectedColors.includes(color)}
                onChange={() => handleColorChange(color)}
              />
            ))}
          </>
        )}
        <hr />
        <Button
          variant="no-border"
          label="Висота букету"
          icon={heightListVisible ? <ICONS.showList /> : <ICONS.hideList />}
          onClick={() => setHeightListVisible(!heightListVisible)}
        />
        {heightListVisible && (
          <>
            {height.map((h) => (
              <Checkbox
                key={h}
                label={h}
                checked={selectedHeight.includes(h)}
                onChange={() => handleHeightChange(h)}
              />
            ))}
          </>
        )}
        <hr />
        <div className={styles.selectedOptions}>
          <p>
            {selectedTypes.map((type) => (
              <span key={type} className={styles.selectedItem}>
                {type}{' '}
                <ICONS.removeSelection onClick={() => handleRemoveType(type)} />
              </span>
            ))}
            {selectedColors.map((color) => (
              <span key={color} className={styles.selectedItem}>
                {color}{' '}
                <ICONS.removeSelection
                  onClick={() => handleRemoveColor(color)}
                />
              </span>
            ))}
            {selectedHeight.map((height) => (
              <span key={height} className={styles.selectedItem}>
                {height}{' '}
                <ICONS.removeSelection
                  onClick={() => handleRemoveHeight(height)}
                />
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

Checkbox.displayName = 'Checkbox';
export default FlowerPicker;

const types = [
  'Айстри',
  'Гвоздики',
  'Гладіолуси',
  'Гербери',
  'Гортензії',
  'Еустоми',
  'Піони',
  'Ромашки',
  'Троянди',
  'Тюльпани',
  'Хризантеми',
  'Мікс',
];
const colors = [
  'Червоний',
  'Рожевий',
  'Білий',
  'Жовтий',
  'Бузковий',
  'Фіолетовий',
  'Помаранчевий',
  'Різнокольорові',
];
const height = ['35-45 см', '55-65 см', '65-85 см', '90-120 см'];
