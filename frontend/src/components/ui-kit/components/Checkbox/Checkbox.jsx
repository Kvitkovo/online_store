import React, { useState } from 'react';
import styles from './Checkbox.module.scss';

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label className={styles.container}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
};

const FlowerPicker = () => {
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

  const [selectedPromotion, setSelectedPromotion] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedHeight, setSelectedHeight] = useState([]);

  const handlePromotion = () => {
    setSelectedPromotion(!selectedPromotion);
  };
  const handleTypeChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };
  const handleColorChange = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };
  const handleHeightChange = (height) => {
    if (selectedHeight.includes(height)) {
      setSelectedHeight(selectedHeight.filter((h) => h !== height));
    } else {
      setSelectedHeight([...selectedHeight, height]);
    }
  };

  return (
    <div className={styles.Checkbox}>
      <Checkbox
        label="Акційна ціна"
        checked={selectedPromotion}
        onChange={() => handlePromotion()}
      />
      <hr />
      <p className={styles.heading}>Вид квітів</p>
      {types.map((type) => (
        <Checkbox
          key={type}
          label={type}
          checked={selectedTypes.includes(type)}
          onChange={() => handleTypeChange(type)}
        />
      ))}
      <hr />
      <p className={styles.heading}>Колір</p>
      {colors.map((color) => (
        <Checkbox
          key={color}
          label={color}
          checked={selectedColors.includes(color)}
          onChange={() => handleColorChange(color)}
        />
      ))}
      <hr />
      <p className={styles.heading}>Висота букета</p>
      {height.map((height) => (
        <Checkbox
          key={height}
          label={height}
          checked={selectedHeight.includes(height)}
          onChange={() => handleHeightChange(height)}
        />
      ))}
      <hr />
    </div>
  );
};

export default FlowerPicker;
